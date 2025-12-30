// support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Actor } from '../screenplay/actors/actor';
import { BrowseTheWeb, BrowserName } from '../screenplay/abilities/browseTheWeb';
import { browserRegistry } from './browser-registry';

export class CustomWorld extends World {
  actor?: Actor;
  private ability?: BrowseTheWeb;
  private browserName: BrowserName = 'chromium';
  private headless: boolean = true;

  constructor(options: IWorldOptions) {
    super(options);
    const params = (options.parameters ?? {}) as { browser?: BrowserName; headless?: boolean };
    this.browserName = (params.browser || 'chromium');
    this.headless = typeof params.headless === 'boolean'
      ? params.headless
      : (process.env.HEADLESS === 'true');
  }

  async initActor(name: string) {
    this.ability = new BrowseTheWeb(this.browserName, { headless: this.headless } as any);
    browserRegistry.register(this.ability);
    this.actor = Actor.named(name).withAbility(this.ability);
    await this.actor.abilityToBrowse.openNewPage();
  }

  async cleanup() {
    await this.actor?.abilityToBrowse.close();
    this.actor = undefined;
  }

  async shutdownAll() {
    await this.ability?.shutdown();
    this.ability = undefined;
  }

  getCurrentBrowser(): BrowserName {
    return this.browserName;
  }
}

setWorldConstructor(CustomWorld);