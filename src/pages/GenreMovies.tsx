import { DynamicPagination } from "@/components/shared/dynamic-pagination";
import { GenreChips } from "@/components/shared/genres/GenreChips";
import { LoadingMovieCardGrid } from "@/components/shared/movie-card/LoadingMovieCard";
import { MovieCard } from "@/components/shared/movie-card/MovieCard";
import { routeConstants } from "@/constants/routeConst";
import { useFetchMovieByGenre } from "@/hooks/useFetchMovieData";
import { StoreRootState } from "@/services/store";
import { MovieApiData } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const GenreMovies = () => {
   const { genre } = useParams() as { genre: string };
   const navigate = useNavigate();

   useEffect(() => {
      if (!genre) {
         return navigate(routeConstants.home);
      }
   });

   useFetchMovieByGenre(genre);

   const { isLoading, movies, genres } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );
   const selectedGenreIDs = genres
      .filter((gen) => genre.split("|").includes(gen.name))
      .map((gen) => gen.id);

   if (isLoading) return <LoadingMovieCardGrid />;

   return (
      <div className="container py-6 sm:py-8">
         <GenreChips />

         <div className="mt-6 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {movies?.results?.map((movie: MovieApiData) => {
               //NOTE: Create a copy of genre_ids and sort it
               const sortedGenreIds = [...movie.genre_ids].sort((a, b) => {
                  const indexA = selectedGenreIDs.includes(a)
                     ? selectedGenreIDs.indexOf(a)
                     : Number.MAX_SAFE_INTEGER;
                  const indexB = selectedGenreIDs.includes(b)
                     ? selectedGenreIDs.indexOf(b)
                     : Number.MAX_SAFE_INTEGER;
                  return indexA - indexB;
               });

               return (
                  <MovieCard
                     key={movie.id}
                     movieId={movie.id}
                     rating={movie.vote_average}
                     title={movie.title || "No Title"}
                     image={movie.poster_path}
                     genre_ids={sortedGenreIds}
                     release_date={movie.release_date}
                  />
               );
            })}
         </div>

         <DynamicPagination
            pageRoute={routeConstants.genreMovie.replace(":genre", genre)}
         />
      </div>
   );
};
