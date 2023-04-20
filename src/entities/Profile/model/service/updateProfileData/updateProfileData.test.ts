import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileErrors } from '../../types/profile';
import { updateProfileData } from './updateProfileData';

const data = {
  username: 'admin',
  birthYear: 1988,
  country: Country.RU,
  lastname: 'Brown',
  first: 'James',
  city: 'Moscow',
  currency: Currency.RUB,
  id: '1',
};

describe('updateProfileData.test', () => {
  test('success asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData,
      {
        profile: {
          form: data,
        },
      },
    );
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData,
      {
        profile: {
          form: data,
        },
      },
    );
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileErrors.UNKNOWN_ERROR,
    ]);
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData,
      {
        profile: {
          form: { ...data, first: '' },
        },
      },
    );
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidateProfileErrors.INCORRECT_USER_NAME,
    ]);
  });
});
