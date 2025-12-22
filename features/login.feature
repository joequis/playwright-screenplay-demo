Feature: Login
  Scenario: Usuario inicia sesión exitosamente
    Given que el usuario abre la página de login
    When ingresa credenciales válidas
    And hace click en el botón login
    #Then debería ver el título de la página de productos