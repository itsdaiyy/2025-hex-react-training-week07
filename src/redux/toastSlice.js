import { createSlice } from "@reduxjs/toolkit";

// const initialState = { messages: [] };

const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      state.push(action.payload);
    },
    removeToast: (state) => {
      state.shift(); // 保留最新的 toast
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
