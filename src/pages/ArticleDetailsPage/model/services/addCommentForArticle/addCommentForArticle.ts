import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { getArticleDetailsData } from 'entities/Article';

import {
  fetchCommentsByArticleId,
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
  >(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
      const {
        rejectWithValue,
        getState,
        dispatch,
        extra: { api },
      } = thunkAPI;

      const userData = getUserAuthData(getState());
      const article = getArticleDetailsData(getState());

      if (!userData || !text || !article) {
        rejectWithValue('SendNewCommentError.DATA_ERROR');
      }

      try {
        const response = await api.post<Comment>(
          '/comments',
          {
            articleId: article?.id,
            userId: userData?.id,
            text,
          },
          {},
        );

        if (!response.data) {
          return rejectWithValue('SendNewCommentError.DATA_ERROR');
        }

        dispatch(fetchCommentsByArticleId(article?.id));

        return response.data;
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e.response && e.response.status === 403) {
            return rejectWithValue('SendNewCommentError.INCORRECT_DATA');
          }
          return rejectWithValue('SendNewCommentError.SERVER_ERROR');
        }
        return rejectWithValue('SendNewCommentError.UNKNOWN_ERROR');
      }
    },
  );
