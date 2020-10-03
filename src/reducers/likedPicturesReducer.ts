import { createSlice } from "@reduxjs/toolkit";
import { listAdd, listRemove } from "./listPictureSlice";

export const slice = createSlice({
  name: "likedPictures",
  initialState: {
    items: [] as string[],
  },
  reducers: {
    add: listAdd,
    remove: listRemove,
  },
});

export const selectPics = (state: any): string[] => state.likedPictures.items;
export const { add, remove } = slice.actions;
export default slice.reducer;
