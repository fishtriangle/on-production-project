import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageSchema, ScrollSchema } from '../types/PageSchema';

const initialState: PageSchema = {
  scroll: {},
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<ScrollSchema>) => {
      state.scroll = { ...state.scroll, ...payload };
    },
  },
});

export const { actions: pageActions } = pageSlice;
export const { reducer: pageReducer } = pageSlice;
