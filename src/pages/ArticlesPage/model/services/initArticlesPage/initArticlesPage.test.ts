import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { initArticlesPage } from './initArticlesPage';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');
jest.mock('../../slices/articlesPageSlice');

const searchParamsMock = new URLSearchParams('?sort=createdAt&order=asc&search=&type=ALL');

describe('initArticlesPage.test', () => {
  test('success asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        limit: 5,
        _isInitiated: false,
      },
    });

    await thunk.callThunk(searchParamsMock);

    expect(thunk.dispatch).toBeCalledTimes(8);
    expect(fetchArticlesList).toBeCalledWith({});
  });

  test('initState n fetchArticleList should not be called because isInitiated true', async () => {
    const thunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: false,
        limit: 5,
        _isInitiated: true,
      },
    });

    await thunk.callThunk(searchParamsMock);

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(articlesPageActions.initState).not.toBeCalled();
    expect(fetchArticlesList).not.toBeCalled();
  });
});
