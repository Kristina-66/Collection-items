import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemResponse } from "../api/types";

interface IitemState {
  item: IItemResponse | null;
}

const initialState: IitemState = {
  item: null,
};

export const itemSlice = createSlice({
  initialState,
  name: "itemsSlice",
  reducers: {
    itemState: (state, action: PayloadAction<IItemResponse>) => {
      state.item = action.payload;
    },
  },
});

export default itemSlice.reducer;

export const { itemState } = itemSlice.actions;
