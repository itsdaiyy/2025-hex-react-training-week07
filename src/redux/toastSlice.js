import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    // {
    //   id: Date.now(),
    //   text: "hello",
    //   status: "success",
    // },
  ],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      const { text, status, id } = action.payload;
      state.messages.push({ id, text, status });
    },
    removeToast: (state, action) => {
      const index = state.messages.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
  },
});

export const createAsyncToast = createAsyncThunk(
  "toast/createAsyncToast",
  async function (payload, { dispatch, requestId }) {
    dispatch(
      addToast({
        ...payload,
        id: requestId,
      })
    );

    setTimeout(() => {
      dispatch(removeToast(requestId));
    }, 2000);
  }
);

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
