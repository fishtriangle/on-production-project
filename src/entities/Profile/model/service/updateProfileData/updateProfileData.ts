import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileErrors } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileErrors[]>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {
      rejectWithValue,
      extra: { api },
      getState,
    } = thunkAPI;

    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await api.put<Profile>(
        '/profile',
        formData,
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.status === 403) {
          // eslint-disable-next-line no-console
          console.log('Error: ', ValidateProfileErrors.INCORRECT_DATA, '\n', e);
          return rejectWithValue([ValidateProfileErrors.INCORRECT_DATA]);
        }
        // eslint-disable-next-line no-console
        console.log('Error: ', ValidateProfileErrors.SERVER_ERROR, '\n', e);
        return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
      }
      // eslint-disable-next-line no-console
      console.log('Error: ', ValidateProfileErrors.UNKNOWN_ERROR, '\n', e);
      return rejectWithValue([ValidateProfileErrors.UNKNOWN_ERROR]);
    }
  },
);
