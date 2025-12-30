// reports/generate-report.js
const report = require('multiple-cucumber-html-reporter');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, 'html');
const jsonDir = path.join(process.cwd(), 'reports', 'json');

report.generate({
  jsonDir,
  reportPath: outputDir,
  displayDuration: true,
  metadata: {
    browser: { name: 'multi', version: 'n/a' },
    device: 'Local',
    platform: { name: process.platform, version: process.version }
  },
  customData: {
    title: 'Run info',
    data: [{ label: 'Generated on', value: new Date().toISOString() }]
  }
});

// 2) Abrir automáticamente (si no es CI)
if (!process.env.CI) {
  const reportFile = path.join(outputDir, 'index.html');
  const cmd =
    process.platform === 'win32'
      ? `start "" "${reportFile}"`
      : process.platform === 'darwin'
      ? `open "${reportFile}"`
      : `xdg-open "${reportFile}"`;

  exec(cmd, (err) => {
    if (err) {
      console.warn('⚠️ No se pudo abrir automáticamente el reporte:', err.message);
      console.warn('   Ábrelo manualmente:', reportFile);
    }
  });
}