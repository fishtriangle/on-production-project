import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Comment } from '@/entities/Comment';
import { addCommentForArticle } from './addCommentForArticle';

const state = {
  user: {
    authData: {
      id: '1',
      username: 'user 1',
    },
  },
  articleDetails: {
    data: {
      id: '1',
      title: 'test title',
      subtitle: 'test subtitle',
      image: 'test image',
      views: 112,
      createdAt: 'test date',
      type: [],
      blocks: [],
    },
  },
};

describe('addCommentForArticle.test', () => {
  test('call asyncThunk with new comment', async () => {
    const newComment: Comment = {
      id: '1',
      text: 'New comment',
      user: {
        id: '1',
        username: 'user 1',
      },
    };

    const thunk = new TestAsyncThunk(
      addCommentForArticle,
      state,
    );

    thunk.api.post.mockReturnValue(Promise.resolve({ data: newComment }));
    const result = await thunk.callThunk('New comment');

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(newComment);
  });

  test('asyncThunk returns error status', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, state);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('New comment');

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('SendNewCommentError.DATA_ERROR');
  });
});
