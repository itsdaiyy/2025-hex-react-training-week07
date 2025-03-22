import { createSlice } from "@reduxjs/toolkit";

const initialState = { carts: [], total: 0, final_total: 0, loading: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
