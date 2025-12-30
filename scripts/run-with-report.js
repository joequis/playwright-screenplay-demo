require('ts-node/register');

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { loadMatrixConfig } = require(path.join(process.cwd(), 'support', 'config'));

(async () => {
  const { browsers, headless: defaultHeadless, parallel } = loadMatrixConfig();
  if (!browsers.length) {
    console.error('❌ Config: "browsers" vacío.');
    process.exit(1);
  }
  const userArgs = process.argv.slice(2);

  // Resolver bin cucumber-js …
  let cucumberBinAbs;
  try {
    const pkgPath = require.resolve('@cucumber/cucumber/package.json');
    const pkgDir = path.dirname(pkgPath);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const rel = typeof pkg.bin === 'string' ? pkg.bin : (pkg.bin && pkg.bin['cucumber-js']) || pkg.bin;
    cucumberBinAbs = path.resolve(pkgDir, rel);
  } catch {
    console.error('❌ Instala @cucumber/cucumber.');
    process.exit(1);
  }

  const runNode = (args, options = {}) =>
    new Promise((resolve) => {
      const child = spawn(process.execPath, args, {
        stdio: 'inherit',
        cwd: process.cwd(),
        shell: false,
        ...options
      });
      child.on('close', (code) => resolve(code ?? 0));
    });

  const runForBrowser = async (entry) => {
    const browserName = entry.name;
    const headless = typeof entry.headless === 'boolean' ? entry.headless : defaultHeadless;

    const jsonOut = path.join('reports', 'json', browserName, 'cucumber-report.json');
    fs.mkdirSync(path.dirname(jsonOut), { recursive: true });

    const worldParams = JSON.stringify({ browser: browserName, headless });

    const args = [
      cucumberBinAbs,
      './features',
      '--require-module', 'ts-node/register',
      '--require', 'src/support/**/*.ts',
      '--require', 'steps/**/*.ts',
      '--format', `json:${jsonOut}`,
      '--format', 'progress',
      '--parallel', String(parallel),
      '--world-parameters', worldParams,
      ...userArgs
    ];

    console.log(`> Ejecutando (${browserName}, headless=${headless}) → ${args.slice(1).join(' ')}`);
    const code = await runNode(args, {
      env: { ...process.env, BROWSER: browserName, HEADLESS: String(headless) }
    });
    return { browserName, code, jsonOut };
  };

  const results = [];
  for (const entry of browsers) {
    results.push(await runForBrowser(entry));
  }

  const reportScript = path.join(process.cwd(), 'reports', 'generate-report.js');
  if (fs.existsSync(reportScript)) {
    console.log('> Generando reporte HTML…');
    const rc = await runNode([reportScript]);
    if (rc !== 0) console.error(`❌ Reporte salió con código ${rc}`);
  }

  const finalExit = results.some(r => r.code !== 0) ? 1 : 0;
  process.exit(finalExit);
})();