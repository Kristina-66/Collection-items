import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollectionResponse } from '../api/types';

interface ICollectionState {
  collection: ICollectionResponse | null;
}

const initialState: ICollectionState = {
  collection: null,
};

export const collectionSlice = createSlice({
  initialState,
  name: 'collectionSlice',
  reducers: {
    collectionState: (state, action: PayloadAction<ICollectionResponse>) => {
      state.collection = action.payload;
    },
  },
});

export default collectionSlice.reducer;

export const { collectionState } = collectionSlice.actions;