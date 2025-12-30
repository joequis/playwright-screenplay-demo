import { Before, After, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { browserRegistry } from './browser-registry';

//Se coloca la creación y limpieza del Actor en hooks para centralizarlo
Before(async function (this: CustomWorld) {
  
  const browser = (this as any).getCurrentBrowser?.() ?? 'chromium';
  this.attach(`Browser: ${browser}`, 'text/plain');
  console.log(`Inicializando actor... (Browser=${browser})`);
  await this.initActor('Joel'); // aquí centralizas la creación del Actor
});

After(async function (this: CustomWorld) {
  console.log('Cerrando context/page del escenario...');
  await this.cleanup(); // aquí cierras todo lo asociado al Actor
});

AfterAll(async function () {
  console.log('Shutdown del Browser para este proceso...');
  await browserRegistry.shutdownAll(); // cierra todos los browsers abiertos en este proceso
});