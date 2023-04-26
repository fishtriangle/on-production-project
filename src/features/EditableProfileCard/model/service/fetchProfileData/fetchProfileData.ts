import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

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
          return rejectWithValue('LoginErrors.INCORRECT_DATA');
        }
        return rejectWithValue('LoginErrors.SERVER_ERROR');
      }
      return rejectWithValue('LoginErrors.UNKNOWN_ERROR');
    }
  },
);
