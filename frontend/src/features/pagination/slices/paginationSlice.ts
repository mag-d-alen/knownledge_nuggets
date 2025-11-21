import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    limit: 5,
    isLastPage: false,
    totalPages: 0,
    totalNuggets: 0,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setIsLastPage: (state, action: PayloadAction<boolean>) => {
      state.isLastPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalNuggets: (state, action: PayloadAction<number>) => {
      state.totalNuggets = action.payload;
    },
  },
});

export default paginationSlice;
