import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: { categories: [ { categoryId: -1, categoryName: "null" } ], categoryMap: {} },
  reducers: {
    setCategories: (state, action) => {
      state.categories = [... action.payload];
    },
    setCagoryMap: (state, action) => {
      state.categoryMap = {...action.payload};
    }
  },
});

export const { setCategories, setCagoryMap } = categorySlice.actions;
export default categorySlice;
