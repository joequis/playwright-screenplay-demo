import { Actor } from '../actors/actor';
import { uiLogin } from '../ui/uiLogin';

export class LoginResult {
  static title() {
    return new LoginResult();
  }

  async answeredBy(actor: Actor): Promise<string> {
    const page = actor.abilityToBrowse.pageInstance;
    // En la página de inventario, el título es .title => "Swag Labs"
    const locator = page.locator(uiLogin.loginTitle);
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() as string;
  }
}
