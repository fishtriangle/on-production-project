import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';
import { AddNewCommentSchema } from '../types/addNewComment';

describe('addNewCommentSlice.test', () => {
  test('test set text', () => {
    const state: DeepPartial<AddNewCommentSchema> = { text: 'old text' };
    expect(
      addNewCommentReducer(
        state as AddNewCommentSchema,
        addNewCommentActions.setText('new text'),
      ),
    ).toEqual({ text: 'new text' });
  });
});
