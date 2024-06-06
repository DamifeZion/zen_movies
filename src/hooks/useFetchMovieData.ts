import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   useGetTrendingMoviesQuery,
   useGetGenresQuery,
   useGetMovieByGenresQuery,
   useGetMovieDetailsQuery,
   useGetMovieRecommendationsQuery,
   useSearchMoviesQuery,
} from "@/services/apis/movieApi";
import {
   setMovies,
   setIsLoading,
   setError,
   setGenres,
   setMovieDetail,
   setRecommendations,
} from "@/services/slices/movies-slice";
import { StoreRootState } from "@/services/store";
import { MovieGenreType } from "@/types";
import { useParams, useSearchParams } from "react-router-dom";

export const useFetchMoviesAndGenres = () => {
   const dispatch = useDispatch();

   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("page") || 1);

   const {
      data: moviesData,
      isLoading: moviesLoading,
      error: moviesError,
   } = useGetTrendingMoviesQuery(page);

   const {
      data: genresData,
      isLoading: genresLoading,
      error: genresError,
   } = useGetGenresQuery();

   useEffect(() => {
      if (moviesData) {
         dispatch(setMovies(moviesData));
      }

      if (genresData) {
         dispatch(setGenres(genresData.genres));
      }

      dispatch(setIsLoading(moviesLoading || genresLoading));
      dispatch(setError(moviesError || genresError));
   }, [
      moviesData,
      genresData,
      moviesLoading,
      genresLoading,
      moviesError,
      genresError,
      dispatch,
   ]);
};

export const useFetchMovieByGenre = (genres: string) => {
   const dispatch = useDispatch();
   const { genres: allGenres } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("page") || 1);

   const newGenres = genres.split("|");
   const selectedGenres = allGenres
      .filter((genre: MovieGenreType) => newGenres.includes(genre.name))
      .map((genre: MovieGenreType) => genre.id)
      .join(",");

   const { data, isLoading, error } = useGetMovieByGenresQuery({
      genres: selectedGenres,
      page,
   });

   useEffect(() => {
      if (data) {
         dispatch(setMovies(data));
      }

      dispatch(setIsLoading(isLoading));
      dispatch(setError(error));
   }, [data, dispatch, error, isLoading]);
};

export const useGetMovieDetailsAndRecommendations = () => {
   const dispatch = useDispatch();
   const { id } = useParams() as { id: string };

   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("recommendation_page") || 1);

   const {
      data: detailsData,
      isLoading: detailsLoading,
      error: detailsError,
   } = useGetMovieDetailsQuery(id);

   const {
      data: recommendationsData,
      isLoading: recommendationsLoading,
      error: recommendationsError,
   } = useGetMovieRecommendationsQuery({ movieId: id, page });

   useEffect(() => {
      if (detailsData) {
         dispatch(setMovieDetail(detailsData));
      }

      if (recommendationsData) {
         dispatch(setRecommendations(recommendationsData));
      }
      // You might want to handle recommendationsData as well

      dispatch(setIsLoading(detailsLoading || recommendationsLoading));
      dispatch(setError(detailsError || recommendationsError));
   }, [
      detailsData,
      recommendationsData,
      dispatch,
      detailsError,
      recommendationsError,
      detailsLoading,
      recommendationsLoading,
   ]);
};

export const useSearchMovies = () => {
   const dispatch = useDispatch();

   const [searchParams] = useSearchParams();
   const page = Number(searchParams.get("page") || 1);
   const searchQuery = searchParams.get("query") as string;

   const { data, isLoading, error } = useSearchMoviesQuery({
      page,
      query: searchQuery,
   });

   useEffect(() => {
      if (data) {
         dispatch(setMovies(data));
      }

      dispatch(setIsLoading(isLoading));
      dispatch(setError(error));
   }, [data, dispatch, error, isLoading]);
};
