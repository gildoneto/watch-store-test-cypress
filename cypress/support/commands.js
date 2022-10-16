Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('addToCart', (mode) => {
  cy.getByTestId('product-card').as('productCards');
  cy.getByTestId('close-button').as('closeButton');

  const click = (index) => {
    cy.get('@productCards').eq(index).find('button').click();
    cy.get('@closeButton').click();
  };

  const addByIndex = () => click(mode.index);
  const addByIndexes = () => {
    for (const index of mode.indexes) {
      click(index);
    }
  };
  const addAll = () => {
    cy.get('@productCards').then(($elements) => {
      let i = 0;
      while (i < $elements.length) {
        click(i);
        i++;
      }
    });
  };

  if (!!mode.indexes && Array.isArray(mode.indexes)) {
    addByIndexes();
  } else if (mode.index) {
    addByIndex();
  } else if (!!mode.indexes && mode.indexes === 'all') {
    addAll();
  } else {
    throw new Error(
      'Please provide a valid input for cy.addToCart()\r\nPossible values are Array, number or "all"'
    );
  }
});
