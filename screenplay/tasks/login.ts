import { Actor } from '../actors/actor';
import { EnterCredentials } from '../interactions/enterCredentials';
import { ClickLogin } from '../interactions/clickLogin';
import { AppUrls } from '../config/urls';

//const BASE_URL = 'https://www.saucedemo.com';

export class Login {
  static openPage() {
    return {
      async performAs(actor: Actor): Promise<void> {
        const page = await actor.abilityToBrowse.openNewPage();
        await page.goto(AppUrls.LOGIN);
      }
    };
  }

  static enterCredentials(user: string, password: string) {
    return EnterCredentials.with(user, password);
  }

  static submit() {
    return ClickLogin.button();
  }
}
