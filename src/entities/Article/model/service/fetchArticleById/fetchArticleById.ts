import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkAPI) => {
  const {
    rejectWithValue,
    extra: { api },
  } = thunkAPI;
  try {
    if (!articleId) {
      throw new Error('No article id detected');
    }

    const response = await api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: 'user',
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e.response && e.response.status === 403) {
        // eslint-disable-next-line no-console
        console.log('Error: ', 'INCORRECT_DATA', '\n', e);
        return rejectWithValue('LoginErrors.INCORRECT_DATA');
      }
      // eslint-disable-next-line no-console
      console.log('Error: ', 'LoginErrors.SERVER_ERROR', '\n', e);
      return rejectWithValue('LoginErrors.SERVER_ERROR');
    }
    // eslint-disable-next-line no-console
    console.log('Error: ', 'UNKNOWN_ERROR', '\n', e);
    return rejectWithValue('LoginErrors.UNKNOWN_ERROR');
  }
});
