import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { Compra } from '../screenplay/tasks/compra';
import { ElementText } from '../screenplay/questions/elementText';
import { uiLocators } from '../screenplay/ui/uiDetalleCompra';
//setDefaultTimeout(10 * 1000); // 10 segundos

When('selecciona el producto {string}', async function (this: CustomWorld, productName) {
  await this.actor!.attemptsTo(Compra.selectProduct(productName));
});

Then('debería validar el nombre del producto {string}', async function (this: CustomWorld, productName) {
  const productTitle = await this.actor!.answer(ElementText.of(uiLocators.detailsName));
  expect(productTitle.trim()).to.equal(productName);
});

Then('debería validar el precio del producto {string}', async function (this: CustomWorld, productPrice) {
  const productTitle = await this.actor!.answer(ElementText.of(uiLocators.detailsPrice));
  expect(productTitle.trim()).to.equal(productPrice);
});

Then('debería validar botón {string} está visible', async function (this: CustomWorld, addtoCartText) {
  const productTitle = await this.actor!.answer(ElementText.of(uiLocators.addToCartButton));
  expect(productTitle.trim()).to.equal(addtoCartText);
});