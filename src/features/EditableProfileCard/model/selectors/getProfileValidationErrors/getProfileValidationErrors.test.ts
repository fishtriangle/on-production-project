import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileErrors } from '../../consts/EditableProfileCardConsts';
import { getProfileValidationErrors } from './getProfileValidationErrors';

describe('getProfileValidationErrors.test', () => {
  test('should return data', () => {
    const errors = [ValidateProfileErrors.SERVER_ERROR, ValidateProfileErrors.UNKNOWN_ERROR];

    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors,
      },
    };
    expect(getProfileValidationErrors(state as StateSchema)).toEqual(errors);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidationErrors(state as StateSchema)).toEqual(undefined);
  });
});
