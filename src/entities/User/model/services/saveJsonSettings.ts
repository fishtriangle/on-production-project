import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getUserSettings } from '../selectors/getUserSettings/getUserSettings';
import { JsonSettings } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
  const { rejectWithValue, getState, dispatch } = thunkAPI;

  const userData = getUserAuthData(getState());
  const currentSettings = getUserSettings(getState());

  if (!userData) {
    return rejectWithValue('NO_USER_DATA');
  }

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue('NO_JSON_SETTINGS_IN_RESPONSE');
    }

    return response.jsonSettings;
  } catch (e: unknown) {
    console.log('Error: ', 'UNKNOWN_ERROR', '\n', e);
    return rejectWithValue('UNKNOWN_ERROR');
  }
});
