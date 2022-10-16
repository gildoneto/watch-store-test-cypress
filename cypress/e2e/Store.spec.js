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
    it('should NOT display shopping cart when page first loads', () => {
      cy.visit('/');

      cy.get('[data-testid="shopping-cart"]').should('have.class', 'hidden');
    });

    it('should toggle shopping cart visibility when button is clicked', () => {
      cy.visit('/');
      cy.get('[data-testid="toggle-button"]').as('toggleButton');
      cy.get('[data-testid="close-button"]').as('closeButton');
      cy.get('@toggleButton').click();
      cy.get('[data-testid="shopping-cart"]').should(
        'not.have.class',
        'hidden'
      );
      cy.get('@closeButton').click();
      cy.get('[data-testid="shopping-cart"]').should('have.class', 'hidden');
    });
  });

  context('Store > Product List', () => {
    it('should display "0 Products" when no product is returned', () => {
      cy.visit('/');
      cy.get('[data-testid="product-card"]').should('have.length', 0);
      cy.get('body').contains('0 Products');
    });
    it('should display "1 Product" when 1 product is returned', () => {
      cy.visit('/');
      server.create('product');

      cy.get('[data-testid="product-card"]').should('have.length', 1);
      cy.get('body').contains('1 Product');
    });
    it('should display "10 Products" when 10 products are returned', () => {
      cy.visit('/');
      server.createList('product', 10);

      cy.get('[data-testid="product-card"]').should('have.length', 10);
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
      cy.get('[data-testid="search-form"]').submit();
      cy.get('[data-testid="product-card"]').should('have.length', 1);
    });

    it('should NOT return any product', () => {
      server.createList('product', 10);

      cy.visit('/');
      cy.get('input[type="search"]').type(PRODUCT_TITLE);
      cy.get('[data-testid="search-form"]').submit();
      cy.get('[data-testid="product-card"]').should('have.length', 0);
      cy.get('body').contains('0 Products');
    });
  });
});
