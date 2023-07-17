const firstCharToUpperCase = require('../firstCharToUpperCase');

module.exports = (slice) => {
  const typeName = `${firstCharToUpperCase(slice)}Schema`;

  return `import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ${typeName} } from '../types/${slice}Schema';

const initialState: ${typeName} = {
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const ${slice}Slice = createSlice({
  name: ${slice},
  initialState,
  reducers: {
    update: (state, action: PayloadAction<${typeName}>) => {
      state.data = {...state.data, ...action.payload}
    },
    revert: (state) => {
      state.validateErrors = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch${typeName}Data.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetch${typeName}Data.fulfilled, (state, action: PayloadAction<${typeName}>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetch${typeName}Data.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
});

export const {actions: ${slice}Actions} = ${slice}Slice;
export const {reducer: ${slice}Reducer} = ${slice}Slice;
`;
};
