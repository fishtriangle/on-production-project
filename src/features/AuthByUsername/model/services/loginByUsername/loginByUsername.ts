import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { LoginErrors } from '../../types/loginSchema';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<IUser, LoginByUsernameProps, {rejectValue: LoginErrors}>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<IUser>(
        'http://localhost:8000/login',
        authData,
      );

      if (!response.data) {
        return thunkAPI.rejectWithValue(LoginErrors.SERVER_ERROR);
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.status === 403) {
          // eslint-disable-next-line no-console
          console.log('Error: ', LoginErrors.INCORRECT_DATA, '\n', e);
          return thunkAPI.rejectWithValue(LoginErrors.INCORRECT_DATA);
        }
        // eslint-disable-next-line no-console
        console.log('Error: ', LoginErrors.SERVER_ERROR, '\n', e);
        return thunkAPI.rejectWithValue(LoginErrors.SERVER_ERROR);
      }
      // eslint-disable-next-line no-console
      console.log('Error: ', LoginErrors.UNKNOWN_ERROR, '\n', e);
      return thunkAPI.rejectWithValue(LoginErrors.UNKNOWN_ERROR);
    }
  },
);
