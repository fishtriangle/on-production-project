import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { SortOrder } from '@/shared/types';
import { ArticleType, ArticleSortField } from '@/entities/Article';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageIsInitiated,
} from '../../selectors/articlesPageSelectors';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
  >(
    'articlePage/initArticlesPage',
    async (searchParams, thunkAPI) => {
      const {
        getState,
        dispatch,
      } = thunkAPI;

      const isInitiated = getArticlesPageIsInitiated(getState());

      if (!isInitiated) {
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const searchFromUrl = searchParams.get('search') as string;
        const typeFromUrl = searchParams.get('type') as ArticleType;

        dispatch(articlesPageActions.setSort(sortFromUrl));
        dispatch(articlesPageActions.setOrder(orderFromUrl));
        dispatch(articlesPageActions.setSearch(searchFromUrl));
        dispatch(articlesPageActions.setType(typeFromUrl));
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
      }
    },
  );
