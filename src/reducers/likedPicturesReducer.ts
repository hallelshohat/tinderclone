import { listPictureSlice } from "./listPictureSlice";

export const slice = listPictureSlice("likedPictures");

export const selectPics = (state: any): string[] => state.likedPictures.items;
export const { add, remove } = slice.actions;
export default slice.reducer;
