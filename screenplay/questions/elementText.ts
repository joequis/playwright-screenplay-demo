import { Actor } from '../actors/actor';

export class ElementText {
      static of(selector: string) {
    return new ElementText(selector);
  }

    private constructor(
    private readonly selector: string,
  ) {}

  async answeredBy(actor: Actor): Promise<string> {
    const page = actor.abilityToBrowse.pageInstance;
    const locator = page.locator(this.selector);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() as string;
  }
}
