import { StateSchema } from '@/app/providers/StoreProvider';

import { getLoginError } from './getLoginError';
import { LoginErrors } from '../../types/loginSchema';

describe('getLoginError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: LoginErrors.INCORRECT_DATA,
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual('ErrorInvalidNameOrPassword!');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});
