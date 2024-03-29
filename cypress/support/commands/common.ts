import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';
import { selectByTestId } from '../../helpers/selectByTestId';

export const login = (
  username: string = 'testuser',
  password: string = '123',
) => {
  cy.session([username, password], () => {
    cy.request({
      method: 'POST',
      url: 'http://[::1]:8888/login',
      body: {
        username,
        password,
      },
    }).then(({ body }) => {
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
    });
  });
};

export const getByTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
