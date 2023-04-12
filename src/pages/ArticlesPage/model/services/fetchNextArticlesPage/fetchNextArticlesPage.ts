import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
  >(
    'articlePage/fetchNextArticlesPage',
    async (_, thunkAPI) => {
      const {
        getState,
        dispatch,
      } = thunkAPI;

      const hasMore = getArticlesPageHasMore(getState());
      const page = getArticlesPageNum(getState());
      const isLoading = getArticlesPageIsLoading(getState());

      if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(fetchArticlesList({}));
      }
    },
  );
