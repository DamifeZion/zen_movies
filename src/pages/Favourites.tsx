import { MovieCard } from "@/components/shared/movie-card/MovieCard";
import { Button } from "@/components/ui/button";
import { routeConstants } from "@/constants/routeConst";
import { useFetchMoviesAndGenres } from "@/hooks/useFetchMovieData";
import { StoreRootState } from "@/services/store";
import { MovieCardProps } from "@/types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourites = () => {
   const { favourites } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );
   useFetchMoviesAndGenres();

   if (!favourites.length) {
      return (
         <div className="min-h-[90vh] flex items-center justify-center">
            <h1 className="flex-grow p-2 flex items-center justify-center text-2xl">
               You have no favourite. Click
               <Link to={routeConstants.home}>
                  <Button
                     variant="link"
                     className="px-2 py-0 size-fit text-2xl"
                  >
                     here
                  </Button>
               </Link>
               to browse movies
            </h1>
         </div>
      );
   }

   return (
      <div className="container">
         <div className="py-6 sm:py-8">
            <div className="flex items-center flex-wrap gap-2">
               <h1 className="text-2xl font-semibold">Favourites</h1>
            </div>

            <div className="mt-6 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
               {favourites.map((movie: MovieCardProps) => (
                  <MovieCard
                     key={movie.movieId}
                     movieId={movie.movieId}
                     rating={movie.rating}
                     title={movie.title}
                     image={movie.image}
                     genre_ids={movie.genre_ids}
                     release_date={movie.release_date}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Favourites;
