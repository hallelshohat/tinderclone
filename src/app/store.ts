import { configureStore } from "@reduxjs/toolkit";
import likedPictureReducer from "../reducers/likedPicturesReducer";
import uploadedPicturesReducer from "../reducers/uploadedPicturesReducer";

export default configureStore({
  reducer: {
    likedPictures: likedPictureReducer,
    uploadedPictures: uploadedPicturesReducer,
  },
});
