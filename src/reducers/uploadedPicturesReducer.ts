import { listPictureSlice } from "./listPictureSlice";

export const slice = listPictureSlice("uploadedPictures");

export const selectPics = (state: any): string[] =>
  state.uploadedPictures.items;
export const { add, remove } = slice.actions;
export default slice.reducer;
