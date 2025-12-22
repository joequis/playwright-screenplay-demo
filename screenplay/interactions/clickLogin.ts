import { Actor } from '../actors/actor';

export class ClickLogin {
  static button() {
    return new ClickLogin();
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.click('#login-button');
  }
}
