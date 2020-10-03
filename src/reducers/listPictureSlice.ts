import { createSlice, Slice } from "@reduxjs/toolkit";

export function listPictureSlice(name: string): Slice {
  return createSlice({
    name,
    initialState: {
      items: [] as string[],
    },
    reducers: {
      add: (state, action) => {
        state.items.push(action.payload);
      },
      remove: (state, action) => {
        const index = state.items.findIndex(
          (item: string) => item === action.payload
        );
        if (index !== -1) state.items.splice(index, 1);
      },
    },
  });
}
