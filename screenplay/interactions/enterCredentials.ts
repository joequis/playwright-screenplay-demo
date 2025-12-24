// screenplay/interactions/enterCredentials.ts
import { Actor } from '../actors/actor';
import { uiLogin } from '../ui/uiLogin';
 
export class EnterCredentials {
  constructor(private user: string, private password: string) {}
 
  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.fill(uiLogin.usernameInput, this.user);
    await page.fill(uiLogin.passwordInput, this.password);
  }
}