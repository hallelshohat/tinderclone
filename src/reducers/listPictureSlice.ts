import { PayloadAction } from "@reduxjs/toolkit";

export const listAdd = (state: any, action: PayloadAction<string>) => {
  state.items.push(action.payload);
};

export const listRemove = (state: any, action: PayloadAction<string>) => {
  const index = state.items.findIndex(
    (item: string) => item === action.payload
  );
  if (index !== -1) state.items.splice(index, 1);
};
