// screenplay/interactions/enterCredentials.ts
import { homedir } from 'node:os';
import { Actor } from '../actors/actor';
import { Login } from '../tasks/login';
 
export class EnterCredentials {
  constructor(private user: string, private password: string) {}
 
  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.fill('#user-name', this.user);
    await page.fill('#password', this.password);
  }
}