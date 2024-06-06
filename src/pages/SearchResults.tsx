import { DynamicPagination } from "@/components/shared/dynamic-pagination";
import { GenreChips } from "@/components/shared/genres/GenreChips";
import { LoadingMovieCardGrid } from "@/components/shared/movie-card/LoadingMovieCard";
import { MovieCard } from "@/components/shared/movie-card/MovieCard";
import { routeConstants } from "@/constants/routeConst";
import { useSearchMovies } from "@/hooks/useFetchMovieData";
import { StoreRootState } from "@/services/store";
import { MovieApiData } from "@/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchResult = () => {
   useSearchMovies();
   const navigate = useNavigate();
   const { movies, isLoading } = useSelector((state: StoreRootState) => state.moviesSlice);

   const [searchParams] = useSearchParams();
   const searchQuery = searchParams.get("query");

   useEffect(() => {
      if (!searchQuery) {
         return navigate(routeConstants.home);
      }
   })


   if (isLoading) return <LoadingMovieCardGrid />;

   if (!movies.results.length) {
      return (
         <div className="container min-h-[90vh] flex flex-col items-center justify-center gap-4 py-4">
            <img src="/no_result.svg" className="max-w-[200px]" />

            <div className="max-w-lg text-center">
               <h1 className="text-5xl  600:text-6xl font-semibold text-primary">No results found</h1>
               <h3 className="mt-1 600:text-xl">We couldn't find what you search for. <br /> Try again</h3>
            </div>
         </div>
      )
   }

   return (
      <div className="container py-6 sm:py-8">
         <GenreChips />

         <div className="mt-6 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {movies.results.map((movie: MovieApiData) => (
               <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  rating={movie.vote_average}
                  title={movie.title}
                  image={movie.poster_path}
                  genre_ids={movie.genre_ids}
                  release_date={movie.release_date}
               />
            ))}
         </div>

         <DynamicPagination multipleQueries={true} pageRoute={`${routeConstants.searchResult}?query=${searchQuery}`} />
      </div>
   );
};

export default SearchResult;
