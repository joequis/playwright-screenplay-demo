Feature: Compra de productos en la tienda en línea

    @smoke @compra
    Scenario: Usuario valida información de productos
        Given que el usuario abre la página de login
        When ingresa credenciales válidas
        And hace click en el botón login
        And selecciona el producto "Sauce Labs Backpack"
        Then debería validar el nombre del producto "Sauce Labs Backpack"
        And debería validar el precio del producto "$29.99"
        And debería validar botón "Add to cart" está visible