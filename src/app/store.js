import { configureStore } from "@reduxjs/toolkit";
import pictureReducer from '../reducers/pictureReducer';

export default configureStore({
    reducer: {
        pictures: pictureReducer
    }
});