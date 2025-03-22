import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: [
    // {
    //   id: "1",
    //   message: "提示訊息",
    //   type: "success",
    // },
  ],
  reducers: {
    addToast: (state, action) => {
      const { requestId, type, message } = action.payload;
      state.push({
        id: requestId,
        type,
        message: Array.isArray(message) ? message.join(`、`) : message,
      });
    },
    removeToast: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const createAsyncToast = createAsyncThunk(
  "toast/createAsyncToast",
  async function (payload, { dispatch, requestId }) {
    dispatch(
      addToast({
        ...payload,
        requestId,
      })
    );

    setTimeout(() => {
      dispatch(removeToast(requestId));
    }, 2000);
  }
);

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
