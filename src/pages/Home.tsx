import { DynamicPagination } from "@/components/shared/dynamic-pagination";
import { GenreChips } from "@/components/shared/genres/GenreChips";
import { LoadingMovieCardGrid } from "@/components/shared/movie-card/LoadingMovieCard";
import { MovieCard } from "@/components/shared/movie-card/MovieCard";
import { routeConstants } from "@/constants/routeConst";
import { useFetchMoviesAndGenres } from "@/hooks/useFetchMovieData";
import { StoreRootState } from "@/services/store";
import { MovieApiData } from "@/types";
import { useSelector } from "react-redux";

const Home = () => {
   useFetchMoviesAndGenres();

   const { isLoading, movies } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   if (isLoading) return <LoadingMovieCardGrid />;

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

         <DynamicPagination pageRoute={routeConstants.movies} />
      </div>
   );
};

export default Home;
