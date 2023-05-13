import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ValidateProfileErrors } from '../consts/EditableProfileCardConsts';
import { ProfileSchema } from '../types/EditableProfileCardSchema';
import { updateProfileData } from '../service/updateProfileData/updateProfileData';
import { profileReducer, profileActions } from './profileSlice';

const data = {
  username: 'admin',
  birthYear: 1988,
  country: Country.RU,
  lastname: 'Brown',
  first: 'James',
  city: 'Moscow',
  currency: Currency.RUB,
};

describe('profileSlice.test', () => {
  test('test setReadonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true),
      ),
    ).toEqual({ readonly: true });
  });

  test('test cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: {
        first: '',
      },
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit(),
      ),
    ).toEqual({
      readonly: true,
      form: data,
      data,
    });
  });

  test('test updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: {
        first: '',
        lastname: '123',
      },
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile(data),
      ),
    ).toEqual({
      form: data,
    });
  });

  test('test updateProfileData service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending,
      ),
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test('test updateProfileData service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      data: undefined,
      form: undefined,
      readonly: false,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      isLoading: false,
      data,
      form: data,
      readonly: true,
      validateErrors: undefined,
    });
  });
});
