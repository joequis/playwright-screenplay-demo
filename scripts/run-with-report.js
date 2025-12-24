
// scripts/run-with-report.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

(async () => {
  // Args tras `npm test --`, p.ej.: ["--tags", "@login"]
  const userArgs = process.argv.slice(2);

  // 1) Resolver la ruta del bin de cucumber leyendo su package.json
  const cucumberPkgJsonPath = require.resolve('@cucumber/cucumber/package.json');
  const cucumberPkgDir = path.dirname(cucumberPkgJsonPath);
  const cucumberPkg = JSON.parse(fs.readFileSync(cucumberPkgJsonPath, 'utf8'));
  // El campo `bin` puede ser string o objeto { "cucumber-js": "..." }
  const binField = cucumberPkg.bin;
  const cucumberBinRel =
    typeof binField === 'string'
      ? binField
      : (binField && binField['cucumber-js']) || binField;
  if (!cucumberBinRel) {
    console.error('❌ No se pudo localizar el binario de cucumber-js en el package.json.');
    process.exit(1);
  }
  const cucumberBinAbs = path.resolve(cucumberPkgDir, cucumberBinRel);

  // 2) Armar los argumentos del CLI (ajusta rutas si tu estructura es distinta)
  const cucumberArgs = [
    cucumberBinAbs,
    './features', // carpeta con tus .feature (AJUSTA si usas otra)
    '--require-module', 'ts-node/register',
    '--require', './features/**/*.ts', // globo para steps TS (AJUSTA si usas otra)
    '--format', 'json:reports/cucumber-report.json',
    '--format', 'progress',
    ...userArgs
  ];

  console.log('> Ejecutando Cucumber con:', cucumberArgs.slice(1).join(' '));

  // 3) Ejecutar "node <bin> ..." SIN shell
  const cucumber = spawn(process.execPath, cucumberArgs, {
    stdio: 'inherit',
    shell: false,
    cwd: process.cwd()
  });

  cucumber.on('close', async (code) => {
    const exitCode = code ?? 0;
    console.log(`> Cucumber terminó con código: ${exitCode}`);
    try {
      await runReport();
    } catch (err) {
      console.error('❌ Error generando el reporte:', err);
    }
    process.exit(exitCode); // devolver el mismo exit code de cucumber
  });
})();

function runReport() {
  return new Promise((resolve, reject) => {
    console.log('> Generando reporte HTML...');
    const reportScript = path.join(process.cwd(), 'reports', 'generate-report.js');
    const nodeProc = spawn(process.execPath, [reportScript], {
      stdio: 'inherit',
      shell: false,
      cwd: process.cwd()
    });
    nodeProc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Reporte salió con código ${code}`));
    });
  });
}
