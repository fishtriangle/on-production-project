import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from 'app/providers/StoreProvider';

import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlePageIsInitiated,
} from '../../selectors/articlesPageSelectors';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
  >(
    'articlePage/initArticlesPage',
    async (_, thunkAPI) => {
      const {
        getState,
        dispatch,
      } = thunkAPI;

      const isInitiated = getArticlePageIsInitiated(getState());

      if (!isInitiated) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({
          page: 1,
        }));
      }
    },
  );
