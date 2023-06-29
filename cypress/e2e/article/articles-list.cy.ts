describe('User visit Articles Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login().then(() => {
      cy.visit('/articles');
    });
  });

  it('Articles successfully load', () => {
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticlesListItem').should('have.length.greaterThan', 3);
  });

  it('Articles successfully load with stubs(fixtures)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticlesList').should('exist');
    cy.getByTestId('ArticlesListItem').should('have.length.greaterThan', 3);
  });
});
