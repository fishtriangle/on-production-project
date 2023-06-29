import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
  const {
    rejectWithValue,
    extra: { api },
  } = thunkAPI;
  try {
    if (!articleId) {
      return rejectWithValue('No article ID');
    }

    const response = await api.get<Comment[]>('/comments', {
      params: {
        articleId,
        _expand: 'user',
      },
    });

    if (!response.data) {
      return rejectWithValue('No response data');
    }

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e.response && e.response.status === 403) {
        return rejectWithValue('CommentsErrors.INCORRECT_DATA');
      }
      return rejectWithValue('CommentsErrors.SERVER_ERROR');
    }
    return rejectWithValue('CommentsErrors.UNKNOWN_ERROR');
  }
});
