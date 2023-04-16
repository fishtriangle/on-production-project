import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
  >(
    'articleDetailsPage/fetchArticleRecommendations',
    async (props, thunkAPI) => {
      const {
        rejectWithValue,
        extra: { api },
      } = thunkAPI;

      try {
        const response = await api.get<Article[]>(
          '/articles',
          {
            params: {
              _limit: 4,
              _expand: 'user',
            },
          },
        );

        if (!response.data) {
          return rejectWithValue('No response data');
        }

        return response.data;
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.status === 403) {
            return rejectWithValue('CommentsErrors.INCORRECT_DATA');
          }
          return rejectWithValue('CommentsErrors.SERVER_ERROR');
        }
        return rejectWithValue('CommentsErrors.UNKNOWN_ERROR');
      }
    },
  );
