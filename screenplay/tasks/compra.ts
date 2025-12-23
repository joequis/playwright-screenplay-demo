// screenplay/tasks/compra.ts
import { Actor } from '../actors/actor';
import { EnterCredentials } from '../interactions/enterCredentials';
import { ClickLogin } from '../interactions/clickLogin';
import { AppUrls } from '../config/urls';
import { ClickElement } from '../interactions/clickElement';

export class Compra {

    private doClick: boolean = false;

    constructor(
        private productName?: string,
        options?: { click?: boolean }
    ) {
        this.doClick = options?.click ?? false;
    }

    static selectProduct(productName: string) {
        return new Compra(productName, { click: true });
    }

    async performAs(actor: Actor): Promise<void> {
        if (this.doClick) {
            const click = new ClickElement(this.productName!);
            await click.execute(actor);
        }
    }

}