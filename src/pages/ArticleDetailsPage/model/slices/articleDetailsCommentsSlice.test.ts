import { Comment } from '@/entities/Comment';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const comments: Comment[] = [
  {
    id: '1',
    text: 'New comment 1',
    user: {
      id: '1',
      username: 'user 1',
    },
  },
  {
    id: '2',
    text: 'New comment 2',
    user: {
      id: '2',
      username: 'user 2',
    },
  },
];

describe('articleDetailsCommentsSlice.test', () => {
  test('test fetchCommentsByArticleId service pending', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.pending,
      ),
    ).toEqual({
      isLoading: true,
      error: undefined,
    });
  });

  test('test fetchCommentsByArticleId service fulfilled', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      isLoading: true,
      ids: undefined,
      entities: undefined,
      error: 'error',
    };
    expect(
      articleDetailsCommentsReducer(
        state as ArticleDetailsCommentsSchema,
        fetchCommentsByArticleId.fulfilled(comments, '', ''),
      ),
    ).toEqual({
      isLoading: false,
      ids: ['1', '2'],
      entities: {
        1: comments[0],
        2: comments[1],
      },
      error: undefined,
    });
  });
});
