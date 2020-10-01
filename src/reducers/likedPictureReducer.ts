import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'likedPictures',
    initialState: {
        pictures: [] as string[]
    },
    reducers: {
        add: (state, action) => {
            state.pictures.push(action.payload);
        },
        remove: (state, action) => {
            const index = state.pictures
                .findIndex(item=> item === action.payload);
            if (index !== -1) 
                state.pictures.splice(index, 1);
        }
    }
});

export const selectPics = (state:any):string[] => state.likedPictures.pictures;
export const {add, remove} = slice.actions;
export default slice.reducer;