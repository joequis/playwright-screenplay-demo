
// reports/generate-report.js
const fs = require('fs');
const path = require('path');
const report = require('multiple-cucumber-html-reporter');

const jsonFile = path.resolve(__dirname, 'cucumber-report.json'); // <- mismo path que en tu cucumber.json
const outputDir = path.resolve(__dirname, 'html');

function ensureFileExists(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ No se encontró el archivo JSON: ${file}`);
    console.error('   Asegúrate de haber corrido los tests y que el formatter JSON esté configurado.');
    process.exit(1);
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

ensureFileExists(jsonFile);
ensureDir(outputDir);

report.generate({
  jsonDir: path.dirname(jsonFile),      // carpeta que contiene el/los .json
  reportPath: outputDir,                // carpeta de salida HTML
  reportName: 'Reporte de Cucumber',
  pageTitle: 'Reporte de pruebas',
  openReportInBrowser: true,           // ponlo en true si quieres abrirlo automáticamente
  displayDuration: true,
  hideMetadata: false,
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local',
    platform: { name: process.platform, version: process.version },
  },
  customData: {
    title: 'Información del build',
    data: [
      { label: 'Proyecto', value: 'playwright-screenplay-demo' },
      { label: 'Entorno', value: process.env.NODE_ENV || 'local' },
      { label: 'Fecha', value: new Date().toLocaleString() },
      { label: 'Tags', value: process.env.CUC_TAGS || '(no especificado)' },
    ],
  },
});
