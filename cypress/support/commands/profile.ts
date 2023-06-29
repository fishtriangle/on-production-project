export const updateProfile = (
  firstname: string = 'New firstname',
  lastname: string = 'New lastname',
) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  cy.origin(
    'http://[::1]:8888/profile',
    { args: { profileId } },
    ({ profileId }) => {
      cy.request({
        method: 'PUT',
        url: `http://[::1]:8888/profile/${profileId}`,
        headers: {
          Authorization: 'testuser',
        },
        body: {
          id: '4',
          first: 'Ivan',
          lastname: 'Tester',
          birthYear: 1992,
          currency: 'RUB',
          country: 'Russia',
          city: 'Moscow',
          username: 'testuser',
          avatar: '',
        },
      });
    },
  );
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
