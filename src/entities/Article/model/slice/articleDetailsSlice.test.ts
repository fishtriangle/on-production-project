import { articleMock } from 'shared/lib/mock/mock';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { Article } from '../types/article';
import { fetchArticleById } from '../service/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from './articleDetailsSlice';

const article: Article = articleMock;

describe('articleDetailsSlice.test.ts', () => {
  test('test fetchArticleById service pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.pending,
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('test fetchArticleById service fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
      data: undefined,
      error: 'error',
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled(article, '', ''),
      ),
    ).toEqual({
      isLoading: false,
      data: article,
      error: undefined,
    });
  });
});
