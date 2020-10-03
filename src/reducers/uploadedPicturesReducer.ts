import { createSlice } from "@reduxjs/toolkit";
import { listAdd, listRemove } from "./listPictureSlice";

export const slice = createSlice({
  name: "uploadedPictures",
  initialState: {
    items: [] as string[],
    index: 0,
  },
  reducers: {
    add: listAdd,
    remove: listRemove,
    increment: (state) => {
      state.index++;
    },

    zero: (state) => {
      state.index = 0;
    },
  },
});

export const selectPics = (state: any): string[] =>
  state.uploadedPictures.items;
export const selectIndex = (state: any): number => state.uploadedPictures.index;

export const { add, remove, increment, zero } = slice.actions;
export default slice.reducer;
