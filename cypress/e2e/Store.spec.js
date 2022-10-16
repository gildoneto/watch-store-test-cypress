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

    cy.get('body').contains('Brand');
    cy.get('body').contains('Wrist Watch');
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
  });

  context('Store > Product List', () => {
    it('should display "0 Products" when no product is returned', () => {
      cy.visit('/');
      cy.getByTestId('product-card').should('have.length', 0);
      cy.get('body').contains('0 Products');
    });
    it('should display "1 Product" when 1 product is returned', () => {
      cy.visit('/');
      server.create('product');

      cy.getByTestId('product-card').should('have.length', 1);
      cy.get('body').contains('1 Product');
    });
    it('should display "10 Products" when 10 products are returned', () => {
      cy.visit('/');
      server.createList('product', 10);

      cy.getByTestId('product-card').should('have.length', 10);
      cy.get('body').contains('10 Products');
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
      cy.get('body').contains('0 Products');
    });
  });
});
