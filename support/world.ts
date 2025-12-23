// Opcional: para futuros escenarios, centraliza creación del Actor
// Por simplicidad en este flujo, lo manejamos directamente en steps.

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, chromium, BrowserContext, Page } from 'playwright';
import { Actor } from '../screenplay/actors/actor';

export class CustomWorld extends World {
    actor?: Actor;
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;

    
  async initActor(name: string) {
    // Crea Playwright recursos por escenario
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Crea el Actor y le da la habilidad
    this.actor = Actor
      .named(name)
      .canBrowseTheWeb();
  }

  async cleanup() {
    // Cierra recursos
    await this.actor?.abilityToBrowse.close();
  }
}

setWorldConstructor(CustomWorld);