const report = require('multiple-cucumber-html-reporter');
 
report.generate({
  jsonDir: './', // carpeta donde está cucumber-report.json
  reportPath: './reports', // carpeta de salida del HTML
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local test machine',
    platform: { name: 'Windows', version: '10' }
  }
});