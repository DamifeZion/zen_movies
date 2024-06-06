import { MovieCardProps, MoviesSliceProps } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MoviesSliceProps = {
   movies: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
   },

   recommendations: {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
   },

   genres: [
      {
         id: 0,
         name: "",
      },
   ],
   favourites: [],
   movieDetail: {},
   isLoading: false,
   error: "",
};

export const movieSlice = createSlice({
   name: "movie slice",

   initialState,

   reducers: {
      setMovies: (state, action) => {
         state.movies = action.payload;
      },

      clearMovies: (state) => {
         state.movies = initialState.movies;
      },

      setRecommendations: (state, action) => {
         state.recommendations = action.payload;
      },

      clearRecommendations: (state) => {
         state.recommendations = initialState.recommendations;
      },

      setGenres: (state, action) => {
         state.genres = action.payload;
      },

      setFavourites: (state, action: PayloadAction<MovieCardProps>) => {
         if (
            state.favourites.some(
               (favourite) => favourite.movieId === action.payload.movieId
            )
         ) {
            state.favourites = state.favourites.filter(
               (favourite) => favourite.movieId !== action.payload.movieId
            );
         } else {
            state.favourites.push(action.payload);
         }
      },

      setMovieDetail: (state, action) => {
         state.movieDetail = action.payload;
      },

      setIsLoading: (state, action) => {
         state.isLoading = action.payload;
      },

      setError: (state, action) => {
         state.error = action.payload;
      },
   },
});

export const {
   setMovies,
   clearMovies,
   setRecommendations,
   clearRecommendations,
   setGenres,
   setFavourites,
   setMovieDetail,
   setIsLoading,
   setError,
} = movieSlice.actions;
