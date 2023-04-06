import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlePageLimit } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  page?: number
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
  >(
    'articlePage/fetchArticlesList',
    async (props, thunkAPI) => {
      const {
        rejectWithValue,
        extra: { api },
        getState,
      } = thunkAPI;

      const { page = 1 } = props;

      const limit = getArticlePageLimit(getState());

      try {
        const response = await api.get<Article[]>(
          '/articles',
          {
            params: {
              _expand: 'user',
              _limit: limit,
              _page: page,
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
