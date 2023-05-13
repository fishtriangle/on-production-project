import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';

import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  needReplaceData?: boolean;
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

      const limit = getArticlesPageLimit(getState());
      const sort = getArticlesPageSort(getState());
      const order = getArticlesPageOrder(getState());
      const search = getArticlesPageSearch(getState());
      const page = getArticlesPageNum(getState());
      const type = getArticlesPageType(getState());

      try {
        addQueryParams({
          sort,
          order,
          search,
          type,
        });

        const response = await api.get<Article[]>(
          '/articles',
          {
            params: {
              _expand: 'user',
              _limit: limit,
              _page: page,
              _sort: sort,
              _order: order,
              q: search,
              type: type === ArticleType.ALL ? undefined : type,
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
