export const addNewComment = (text: string) => {
  cy.getByTestId('AddNewCommentForm.input').type(text);
  cy.getByTestId('AddNewCommentForm.button').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addNewComment(text: string): Chainable<void>;
    }
  }
}
