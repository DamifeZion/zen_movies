import { NavbarSliceProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: NavbarSliceProps = {
   showSearchBar: false,
};

export const navbarSlice = createSlice({
   name: "navbarSlice",

   initialState,

   reducers: {
      setShowSearchBar: (state, action: PayloadAction<boolean | undefined>) => {
         if (action.payload === undefined) {
            state.showSearchBar = !state.showSearchBar;
         } else {
            state.showSearchBar = action.payload;
         }
      },
   },
});

export const { setShowSearchBar } = navbarSlice.actions;
