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
});
