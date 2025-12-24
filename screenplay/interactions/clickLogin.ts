// screenplay/interactions/clickLogin.ts
import { Actor } from '../actors/actor';
import { uiLogin } from '../ui/uiLogin';
 
export class ClickLogin {
  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.click(uiLogin.loginButton);
  }
}
