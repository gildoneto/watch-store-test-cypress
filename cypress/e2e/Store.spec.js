/// <reference types="cypress"/>

import { makeServer } from '../../miragejs/server';

context('Store', () => {
  let server;
  const PRODUCT_TITLE = 'Relógio bonito';
  const SOME_TEXT = 'Some text here';

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should display the store', () => {
    cy.visit('http://localhost:3000');
    cy.get('body').contains('Relógio de Pulso');
  });

  context('Store > Shopping cart', () => {
    const quantity = 10;

    beforeEach(() => {
      server.createList('product', quantity);
      cy.visit('/');
    });
    it('should NOT display shopping cart when page first loads', () => {
      cy.getByTestId('shopping-cart').should('have.class', 'hidden');
    });

    it('should toggle shopping cart visibility when button is clicked', () => {
      cy.getByTestId('toggle-button').as('toggleButton');
      cy.getByTestId('close-button').as('closeButton');
      cy.get('@toggleButton').click();
      cy.getByTestId('shopping-cart').should('not.have.class', 'hidden');
      cy.get('@closeButton').click();
      cy.getByTestId('shopping-cart').should('have.class', 'hidden');
    });

    it('should NOT display "Clear cart" button when cart is empty', () => {
      cy.getByTestId('toggle-button').as('openCart');
      cy.get('@openCart').click();

      cy.getByTestId('clear-cart-button', { force: true }).should(
        'not.be.visible'
      );
    });

    it('should display "Cart is empty" message when there are no products', () => {
      cy.getByTestId('toggle-button').as('toggleButton');
      cy.get('@toggleButton').click();
      cy.getByTestId('shopping-cart').contains('Cart is empty');
    });
    it('should open shopping cart when product is added', () => {
      cy.getByTestId('product-card').first().find('button').click();
      cy.getByTestId('shopping-cart').should('not.have.class', 'hidden');
    });

    it('should add first product to the cart', () => {
      cy.getByTestId('product-card').first().find('button').click();
      cy.getByTestId('cart-item').should('have.length', 1);
    });

    it('should add 3 products to the cart', () => {
      cy.addToCart({ indexes: [1, 3, 5] });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('cart-item').should('have.length', 3);
    });

    it('should add 1 product to the cart', () => {
      cy.addToCart({ index: 6 });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('cart-item').should('have.length', 1);
    });

    it('should add all products to the cart', () => {
      cy.addToCart({ indexes: 'all' });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('cart-item').should('have.length', quantity);
    });

    it('should display quantity 1 when product is added to cart', () => {
      cy.addToCart({ index: 1 });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('quantity').contains(1);
    });
    it('should increase quantity when button + gets clicked', () => {
      cy.addToCart({ index: 1 });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('+').click();
      cy.getByTestId('quantity').contains(2);
      cy.getByTestId('+').click();
      cy.getByTestId('quantity').contains(3);
    });
    it('should decrease quantity when button - gets clicked', () => {
      cy.addToCart({ index: 1 });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('+').click();
      cy.getByTestId('+').click();
      cy.getByTestId('quantity').contains(3);
      cy.getByTestId('-').click();
      cy.getByTestId('quantity').contains(2);
      cy.getByTestId('-').click();
      cy.getByTestId('quantity').contains(1);
    });
    it('should NOT decrease below zero when button - gets clicked', () => {
      cy.addToCart({ index: 1 });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('-').click();
      cy.getByTestId('-').click();
      cy.getByTestId('quantity').contains(0);
    });

    it('should remove a product from cart', () => {
      cy.getByTestId('toggle-button').as('openCart');

      cy.addToCart({ index: 2 });
      cy.get('@openCart').click();
      cy.getByTestId('cart-item').as('cartItems');
      cy.get('@cartItems').should('have.length', 1);

      cy.get('@cartItems')
        .first()
        .find('[data-testid="remove-button"]')
        .click();
      cy.get('@cartItems').should('have.length', 0);
    });

    it('should clear cart when "Clear cart" button is clicked', () => {
      cy.addToCart({ indexes: [1, 2, 3] });
      cy.getByTestId('toggle-button').click();
      cy.getByTestId('cart-item').should('have.length', 3);
      cy.getByTestId('clear-cart-button').click();
      cy.getByTestId('cart-item').should('have.length', 0);
    });
  });

  context('Store > Product List', () => {
    it('should display "0 Produtos" when no product is returned', () => {
      cy.visit('/');
      cy.getByTestId('product-card').should('have.length', 0);
      cy.get('body').contains('0 Produtos');
    });
    it('should display "1 Produto" when 1 product is returned', () => {
      cy.visit('/');
      server.create('product');

      cy.getByTestId('product-card').should('have.length', 1);
      cy.get('body').contains('1 Produto');
    });
    it('should display "10 Produtos" when 10 products are returned', () => {
      cy.visit('/');
      server.createList('product', 10);

      cy.getByTestId('product-card').should('have.length', 10);
      cy.get('body').contains('10 Produtos');
    });
  });

  context('Store > Search for products', () => {
    it('should type in the search field', () => {
      cy.visit('/');

      cy.get('input[type="search"]')
        .type(SOME_TEXT)
        .should('have.value', SOME_TEXT);
    });

    it('should return 1 product when "Relógio bonito" is used as search term', () => {
      server.create('product', {
        title: PRODUCT_TITLE,
      });
      server.createList('product', 10);

      cy.visit('/');
      cy.get('input[type="search"]').type(PRODUCT_TITLE);
      cy.getByTestId('search-form').submit();
      cy.getByTestId('product-card').should('have.length', 1);
    });

    it('should NOT return any product', () => {
      server.createList('product', 10);

      cy.visit('/');
      cy.get('input[type="search"]').type(PRODUCT_TITLE);
      cy.getByTestId('search-form').submit();
      cy.getByTestId('product-card').should('have.length', 0);
      cy.get('body').contains('0 Produtos');
    });
  });
});
