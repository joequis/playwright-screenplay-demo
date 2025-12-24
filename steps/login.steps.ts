import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import { Login } from '../screenplay/tasks/login';
import { LoginResult } from '../screenplay/questions/loginResult';
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(10 * 1000); // 10 segundos

Given('que el usuario abre la página de login', async function (this: CustomWorld) {
  await this.actor!.attemptsTo(Login.openPage());
});

When('ingresa credenciales válidas', async function (this: CustomWorld) {
  await this.actor!.attemptsTo(Login.enterCredentials('standard_user', 'secret_sauce'));
});

Then('hace click en el botón login', async function (this: CustomWorld) {
  await this.actor!.attemptsTo(Login.clickLogin());
});

Then('debería ver el título de la página de productos', async function (this: CustomWorld) {
  const title = await this.actor!.answer(LoginResult.title());
  expect(title.trim()).to.equal('Swag Labs');
});