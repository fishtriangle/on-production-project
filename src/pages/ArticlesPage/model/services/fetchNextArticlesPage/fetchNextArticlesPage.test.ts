import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
  test('success asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: true,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toBeCalled();
  });

  test('fetchArticleList should not be called because hasMore false', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        isLoading: false,
        hasMore: false,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toBeCalled();
  });

  test('fetchArticleList should not be called because isLoading true', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        isLoading: true,
        hasMore: true,
        limit: 5,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toBeCalled();
  });
});
