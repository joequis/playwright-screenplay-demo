import { Given, When, Then, After, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Actor } from '../screenplay/actors/actor';
import { CustomWorld } from '../support/world';
import { Login } from '../screenplay/tasks/login';
import { LoginResult } from '../screenplay/questions/loginResult';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { Compra } from '../screenplay/tasks/compra';
import { ElementText } from '../screenplay/questions/elementText';
import { detalleLocators } from '../screenplay/locators/detalleCompra';
setDefaultTimeout(10 * 1000); // 10 segundos

When('selecciona el producto {string}', async function (productName, support: CustomWorld) {
  await support.actor!.attemptsTo(Compra.selectProduct(productName));
});

Then('debería validar el nombre del producto {string}', async function (productName, support: CustomWorld) {
  const productTitle = await support.actor!.answer(ElementText.of(detalleLocators.detailsName));
  expect(productTitle.trim()).to.equal(productName);
});

Then('debería validar el precio del producto {string}', async function (productPrice, support: CustomWorld) {
  const productTitle = await support.actor!.answer(ElementText.of(detalleLocators.detailsPrice));
  expect(productTitle.trim()).to.equal(productPrice);
});

Then('debería validar botón {string} está visible', async function (addtoCartText, support: CustomWorld) {
  const productTitle = await support.actor!.answer(ElementText.of(detalleLocators.addToCartButton));
  expect(productTitle.trim()).to.equal(addtoCartText);
});