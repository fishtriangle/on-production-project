import { StateSchema } from 'app/providers/StoreProvider'; import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from './getComments';

describe('getArticleCommentsError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          error: 'ArticleDetailsCommentsErrors.INCORRECT_DATA',
        },
      },
    };
    expect(getArticleCommentsError(state as StateSchema)).toEqual('ArticleDetailsCommentsErrors.INCORRECT_DATA');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleCommentsError(state as StateSchema)).toEqual(undefined);
  });
});

describe('getArticleCommentsIsLoading.test', () => {
  test('should return true', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsPage: {
        comments: {
          isLoading: true,
        },
      },
    };
    expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(undefined);
  });
});
