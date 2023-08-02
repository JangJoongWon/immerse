import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: { value: 0, token: null },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload; // 토큰 값을 업데이트하는 액션 추가
    },
    logOut: (state) => {
      state.token = null
    }
  },
});

export const { up, setToken, logOut } = userSlice.actions;
export default userSlice;
