import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';

//Se coloca la creación y limpieza del Actor en hooks para centralizarlo
Before(async function (this: CustomWorld) {
  console.log('Inicializando actor...');
  await this.initActor('Joel'); // aquí centralizas la creación del Actor
});

After(async function (this: CustomWorld) {
  console.log('Cerrando navegador...');
  await this.cleanup(); // aquí cierras todo lo asociado al Actor
});