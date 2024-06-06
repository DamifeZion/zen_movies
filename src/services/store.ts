import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slices/movies-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { movieApi } from "./apis/movieApi";
import { navbarSlice } from "./slices/navbarSlice";

const persistConfiguration = {
   key: "root",
   version: 1,
   storage,
};

const reducer = combineReducers({
   moviesSlice: movieSlice.reducer,
   navbarSlice: navbarSlice.reducer,

   // Api reducer
   [movieApi.reducerPath]: movieApi.reducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

export const store = configureStore({
   reducer: persistedReducer,

   // For API  Query
   middleware: (getDefaultMiddleware) =>
      // NOTE: Set SerializableCheck to false in getDefaultMiddleware, redux persist will throw error.
      getDefaultMiddleware({ serializableCheck: false }).concat([
         movieApi.middleware,
      ]),
});

export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
