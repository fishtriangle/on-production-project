import { StateSchema } from '@/app/providers/StoreProvider';
import {
  getAddNewCommentError,
  getAddNewCommentText,
} from './addNewCommentSelectors';

describe('getAddNewCommentText.test', () => {
  test('should return comment text', () => {
    const state: DeepPartial<StateSchema> = {
      addNewComment: {
        text: 'Comment number 1',
      },
    };
    expect(getAddNewCommentText(state as StateSchema)).toBe('Comment number 1');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddNewCommentText(state as StateSchema)).toBe('');
  });
});

describe('getAddNewCommentError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      addNewComment: {
        error: 'addNewComment.INCORRECT_DATA',
      },
    };
    expect(getAddNewCommentError(state as StateSchema)).toEqual('addNewComment.INCORRECT_DATA');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getAddNewCommentError(state as StateSchema)).toEqual(undefined);
  });
});
