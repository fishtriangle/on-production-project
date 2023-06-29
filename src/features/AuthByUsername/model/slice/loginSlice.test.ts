import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../types/loginSchema';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: 'user' };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('newUser')),
    ).toEqual({ username: 'newUser' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: 'userPassword' };
    expect(
      loginReducer(
        state as LoginSchema,
        loginActions.setPassword('newUserPassword'),
      ),
    ).toEqual({ password: 'newUserPassword' });
  });
});
