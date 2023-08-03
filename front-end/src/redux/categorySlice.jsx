import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: { categories: [] },
  reducers: {
    setCategories: (state, action) => {
      state.categories = [... action.categories]
    }
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice;
