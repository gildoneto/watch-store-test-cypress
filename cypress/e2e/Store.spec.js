/// <reference types="cypress"/>

import { makeServer } from '../../miragejs/server';

context('Store', () => {
  let server;

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

  context('Store > Search for products', () => {
    it('should type in the search field', () => {
      const TYPE_TEXT = 'Some text here';
      cy.visit('http://localhost:3000');

      cy.get('input[type="search"]')
        .type(TYPE_TEXT)
        .should('have.value', TYPE_TEXT);
    });

    it.only('should type in the search field', () => {
      const PRODUCT_TITLE = 'Relógio bonito';
      server.create('product', {
        title: PRODUCT_TITLE,
      });
      server.createList('product', 10);
      cy.visit('http://localhost:3000');
      cy.get('input[type="search"]').type(PRODUCT_TITLE);
      cy.get('[data-testid="search-form"]').submit();

      cy.get('[data-testid="product-card"]').should('have.length', 1);
    });
  });
});
