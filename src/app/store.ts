import { configureStore } from "@reduxjs/toolkit";
import likedPictureReducer from "../reducers/likedPictureReducer";

export default configureStore({
  reducer: {
    likedPictures: likedPictureReducer,
  },
});
