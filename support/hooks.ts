import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  await this.initActor('Joel'); // aquí centralizas la creación del Actor
});

After(async function (this: CustomWorld) {
  await this.cleanup(); // aquí cierras todo lo asociado al Actor
});
