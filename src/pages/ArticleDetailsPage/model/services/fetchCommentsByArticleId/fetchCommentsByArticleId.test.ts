import { Comment } from '@/entities/Comment';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import {
  fetchCommentsByArticleId,
} from './fetchCommentsByArticleId';

const data:Comment[] = [
  {
    id: '1',
    text: 'comment 1',
    user: { id: '1', username: 'user 1' },
  },
  {
    id: '2',
    text: 'comment 2',
    user: { id: '2', username: 'user 2' },
  },
];

describe('fetchCommentsByArticleId.test', () => {
  test('success asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(
      fetchCommentsByArticleId,
    );
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error asyncThunk call', async () => {
    const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
