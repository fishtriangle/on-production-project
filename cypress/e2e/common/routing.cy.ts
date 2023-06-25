import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('user is authorized', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login();
    });

    it('Try to open Profile page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('Try to open Articles page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });

  describe('user is not authorized', () => {
    it('Navigate to Main page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Try to open Profile page and redirect to Main page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Try to open not existing page', () => {
      cy.visit('/dhsksb');
      cy.get(selectByTestId('Page404')).should('exist');
    });
  });
});
