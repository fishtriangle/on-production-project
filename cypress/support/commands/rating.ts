export const setRate = (
  starsCount: number,
  feedback: string = 'New feedback',
) => {
  cy.getByTestId(`StarRating.${starsCount}`).click();
  cy.getByTestId('RatingCard.input').type(feedback);
  cy.getByTestId('RatingCard.send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(starsCount: number, feedback: string): Chainable<void>;
    }
  }
}
