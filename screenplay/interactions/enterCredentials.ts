import { Actor } from '../actors/actor';

export class EnterCredentials {
  static with(user: string, password: string) {
    return new EnterCredentials(user, password);
  }

  constructor(private user: string, private password: string) {}

  async performAs(actor: Actor): Promise<void> {
    const page = await actor.abilityToBrowse.openNewPage();
    await page.fill('#user-name', this.user);
    await page.fill('#password', this.password);
  }
}
