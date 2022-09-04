import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentResponse } from "../api/types";

interface ICommentState {
  comment: ICommentResponse | null;
}

const initialState: ICommentState = {
  comment: null,
};

export const commentSlice = createSlice({
  initialState,
  name: "ICommentSlice",
  reducers: {
    commentState: (state, action: PayloadAction<ICommentResponse>) => {
      state.comment = action.payload;
    },
  },
});

export default commentSlice.reducer;

export const { commentState } = commentSlice.actions;
