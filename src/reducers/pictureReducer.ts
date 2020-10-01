import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'pictures',
    initialState: {
        pictures: [] as string[]
    },
    reducers: {
        add: (state, action) => {
            state.pictures.push(action.payload);
        },
        remove: (state, action) => {
            state.pictures = state.pictures.filter(item=>item === action.payload);
        }
    }
});

export const selectPics = (state:any):string[] => state.pictures.pictures;
export const {add, remove} = slice.actions;
export default slice.reducer;