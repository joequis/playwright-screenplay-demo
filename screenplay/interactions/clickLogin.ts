// screenplay/interactions/clickLogin.ts
import { Actor } from '../actors/actor';
 
export class ClickLogin {
  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.click('#login-button');
  }
}
