import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { value: 0, token: null },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload; // 토큰 값을 업데이트하는 액션 추가
    },
  },
});

export const { up, setToken } = counterSlice.actions;
export default counterSlice.reducer;
