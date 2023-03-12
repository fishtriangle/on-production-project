import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (_, thunkAPI) => {
    const {
      rejectWithValue,
      extra: { api },
      getState,
    } = thunkAPI;

    const formData = getProfileForm(getState());

    try {
      const response = await api.put<Profile>(
        '/profile',
        formData,
      );

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.status === 403) {
          // eslint-disable-next-line no-console
          console.log('Error: ', 'LoginErrors.INCORRECT_DATA', '\n', e);
          return rejectWithValue('LoginErrors.INCORRECT_DATA');
        }
        // eslint-disable-next-line no-console
        console.log('Error: ', 'LoginErrors.SERVER_ERROR', '\n', e);
        return rejectWithValue('LoginErrors.SERVER_ERROR');
      }
      // eslint-disable-next-line no-console
      console.log('Error: ', 'LoginErrors.UNKNOWN_ERROR', '\n', e);
      return rejectWithValue('LoginErrors.UNKNOWN_ERROR');
    }
  },
);
