// screenplay/tasks/login.ts
import { Actor } from '../actors/actor';
import { EnterCredentials } from '../interactions/enterCredentials';
import { ClickLogin } from '../interactions/clickLogin';
import { AppUrls } from '../config/urls';
 
export class Login {
  private doOpenPage: boolean = false;
  private doEnterCredentials: boolean = false;
  private doClick: boolean = false;
 
  constructor(
    private user?: string,
    private password?: string,
    options?: { open?: boolean; enter?: boolean; click?: boolean }
  ) {
    this.doOpenPage = options?.open ?? false;
    this.doEnterCredentials = options?.enter ?? false;
    this.doClick = options?.click ?? false;
  }
 
  // Método 1: abrir página de login
  static openPage() {
    return new Login(undefined, undefined, { open: true });
  }
 
  // Método 2: ingresar credenciales (sin click)
  static enterCredentials(user: string, password: string) {
    return new Login(user, password, { enter: true });
  }
 
  // Método 3: solo click en login (sin credenciales)
  static clickLogin() {
    return new Login(undefined, undefined, { click: true });
  }
 
  async performAs(actor: Actor): Promise<void> {
    //Se le podría implementar un swich pero se vería más extenso
    if (this.doOpenPage) {
      const page = await actor.abilityToBrowse.openNewPage();
      await page.goto(AppUrls.LOGIN);
    }
 
    if (this.doEnterCredentials && this.user && this.password) {
      const enter = new EnterCredentials(this.user, this.password);
      await enter.execute(actor);
    }
 
    if (this.doClick) {
      const click = new ClickLogin();
      await click.execute(actor);
    }
  }
}