import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
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

      const hasMore = getArticlePageHasMore(getState());
      const page = getArticlePageNum(getState());
      const isLoading = getArticlePageIsLoading(getState());

      if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(fetchArticlesList({
          page: page + 1,
        }));
      }
    },
  );
