import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  string | undefined,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (profileId, thunkAPI) => {
    const {
      rejectWithValue,
      extra: { api },
    } = thunkAPI;
    try {
      if (!profileId) {
        return rejectWithValue('No profile ID');
      }

      const response = await api.get<Profile>(
        `/profile/${profileId}`,
      );

      if (!response.data) {
        throw new Error();
      }

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
