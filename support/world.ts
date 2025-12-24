// support/world.ts
// Se utiliza CustomWorld para gestionar el ciclo de vida del Actor y los recursos de Playwright

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Actor } from '../screenplay/actors/actor';

export class CustomWorld extends World {
  actor?: Actor;

  async initActor(name: string) {
    // Crea el Actor y asigna la habilidad (la ability gestionará el browser internamente)
    this.actor = Actor.named(name).canBrowseTheWeb();

    // Inicializa la page una vez para luego poder acceder con pageInstance
    await this.actor.abilityToBrowse.openNewPage();
  }

  async cleanup() {
    // Cierra recursos con la abilidad BrowseTheWeb
    await this.actor?.abilityToBrowse.close();
    this.actor = undefined;
  }
}

setWorldConstructor(CustomWorld);