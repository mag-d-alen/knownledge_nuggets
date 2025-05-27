import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    darkMode:false,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export default uiSlice.reducer;
