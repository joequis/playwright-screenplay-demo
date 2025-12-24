// screenplay/interactions/clickLogin.ts
import { Actor } from '../actors/actor';
 
export class ClickElement {

  constructor(private elementName: string) {}

  async execute(actor: Actor): Promise<void> {
    const page = actor.abilityToBrowse.pageInstance;
    await page.click(`text=${this.elementName}`);
  }
}