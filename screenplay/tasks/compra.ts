// screenplay/tasks/compra.ts
import { Actor } from '../actors/actor';
import { ClickElement } from '../interactions/clickElement';

export class Compra {

    private doClick: boolean = false;

    constructor(
        private productName?: string,
        options?: { click?: boolean }
    ) {
        this.doClick = options?.click ?? false;
    }

    // Método 1: seleccionar producto
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