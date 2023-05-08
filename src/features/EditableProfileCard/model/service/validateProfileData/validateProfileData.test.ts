import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileErrors } from '../../consts/EditableProfileCardConsts';
import { validateProfileData } from './validateProfileData';

const data = {
  username: 'admin',
  birthYear: 1988,
  country: Country.RU,
  lastname: 'Brown',
  first: 'James',
  city: 'Moscow',
  currency: Currency.RUB,
};

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without firstname and lastname', async () => {
    const result = validateProfileData({ ...data, first: undefined });

    expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_NAME]);
  });

  test('incorrect birthyear', async () => {
    const result = validateProfileData({ ...data, birthYear: 193 });

    expect(result).toEqual([ValidateProfileErrors.INCORRECT_BIRTHYEAR]);
  });

  test('without country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileErrors.INCORRECT_COUNTRY]);
  });

  test('empty profile', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_NAME,
      ValidateProfileErrors.INCORRECT_LASTNAME,
      ValidateProfileErrors.INCORRECT_BIRTHYEAR,
      ValidateProfileErrors.INCORRECT_COUNTRY,
    ]);
  });
});
