import { BrowseTheWeb } from '../abilities/browseTheWeb';

export class Actor {
  private name: string;
  private web?: BrowseTheWeb;

  private constructor(name: string) {
    this.name = name;
  }

  static named(name: string): Actor {
    return new Actor(name);
  }

  canBrowseTheWeb(): Actor {
    this.web = new BrowseTheWeb();
    return this;
  }

  get abilityToBrowse(): BrowseTheWeb {
    if (!this.web) throw new Error('Actor no tiene la habilidad BrowseTheWeb');
    return this.web;
  }

  async attemptsTo(...tasks: Array<{ performAs: (actor: Actor) => Promise<void> }>): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  async answer<T>(question: { answeredBy: (actor: Actor) => Promise<T> }): Promise<T> {
    return await question.answeredBy(this);
  }
}
