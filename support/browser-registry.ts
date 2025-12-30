import { BrowseTheWeb } from '../screenplay/abilities/browseTheWeb';

class BrowserRegistry {
  private static _instance: BrowserRegistry;
  private abilities = new Set<BrowseTheWeb>();

  static get instance(): BrowserRegistry {
    if (!this._instance) this._instance = new BrowserRegistry();
    return this._instance;
  }

  register(ability: BrowseTheWeb) { this.abilities.add(ability); }
  unregister(ability: BrowseTheWeb) { this.abilities.delete(ability); }

  async shutdownAll() {
    const toClose = [...this.abilities];
    for (const ability of toClose) {
      await ability.shutdown().catch(() => {});
      this.abilities.delete(ability);
    }
  }
}

export const browserRegistry = BrowserRegistry.instance;