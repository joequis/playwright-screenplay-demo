import { Given, When, Then, After, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Actor } from '../screenplay/actors/actor';
import { Login } from '../screenplay/tasks/login';
import { LoginResult } from '../screenplay/questions/loginResult';
import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(10 * 1000); // 10 segundos

let actor: Actor;

// Inicializa nombre al Actor
Before(async function () {
  actor = Actor.named('Joel').canBrowseTheWeb();
});

Given('que el usuario abre la página de login', async function () {
  await actor.attemptsTo(Login.openPage());
});

When('ingresa credenciales válidas', async function () {
  await actor.attemptsTo(Login.enterCredentials('standard_user', 'secret_sauce'));
});

Then('hace click en el botón login', async function () {
  await actor.attemptsTo(Login.clickLogin());
});

Then('debería ver el título de la página de productos', async function () {
  const title = await actor.answer(LoginResult.title());
  expect(title.trim()).to.equal('Swag Labs');
});

// Cierre del browser al finalizar cada escenario
After(async function () {
  if (actor) {
    await actor.abilityToBrowse.close();
  }
});
