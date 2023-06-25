import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';

export const login = (username: string = 'testuser', password: string = '123') => {
  cy.origin(
    'http://[::1]:8888/login',
    { args: { username, password } },
    ({ username, password }) => {
      cy.request({
        method: 'POST',
        url: 'http://[::1]:8888/login',
        body: {
          username,
          password,
        },
      });
    },
  );
  window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify({ username, password }));
};
