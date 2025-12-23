// screenplay/interactions/enterCredentials.ts
import { homedir } from 'node:os';
import { Actor } from '../actors/actor';
import { Login } from '../tasks/login';
import { loginLocators } from '../locators/loginLocators';
 
export class EnterCredentials {
  constructor(private user: string, private password: string) {}
 
  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.fill(loginLocators.usernameInput, this.user);
    await page.fill(loginLocators.passwordInput, this.password);
  }
}