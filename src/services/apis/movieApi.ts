import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { api } from "./endpoint";

export const movieApi = createApi({
   reducerPath: "movieApi",

   baseQuery,

   endpoints: (builder) => ({
      getTrendingMovies: builder.query({
         query: (page: number) => ({
            url: api.trending.replace(":page", String(page)),
         }),
      }),

      getGenres: builder.query<{ genres: [] }, void>({
         query: () => api.genres,
      }),

      getMovieByGenres: builder.query({
         query: (body: { page: number; genres: string }) => ({
            url: api.movieByGenre
               .replace(":page", String(body.page))
               .replace(":genres", body.genres),
         }),
      }),

      searchMovies: builder.query({
         query: (body: { query: string; page: number }) =>
            `${api.searchMovie.replace(":query", body.query).replace(":page", String(body.page))}`,
      }),

      getMovieDetails: builder.query({
         query: (movieId) => `${api.movieDetail.replace(":movie_id", movieId)}`,
      }),

      getMovieRecommendations: builder.query({
         query: (body: { movieId: string; page: number }) =>
            api.movieRecommendation
               .replace(":movie_id", body.movieId)
               .replace(":page", String(body.page)),
      }),
   }),
});

export const {
   useGetTrendingMoviesQuery,
   useGetGenresQuery,
   useGetMovieByGenresQuery,
   useSearchMoviesQuery,
   useGetMovieDetailsQuery,
   useGetMovieRecommendationsQuery,
} = movieApi;
