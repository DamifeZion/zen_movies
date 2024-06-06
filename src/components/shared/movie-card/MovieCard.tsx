import { AiFillStar } from "react-icons/ai";
import { BsBookmarkStarFill, BsBookmarkPlus } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { routeConstants } from "@/constants/routeConst";
import { MovieCardProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { cn } from "@/lib/utils";
import { clearMovies, setFavourites } from "@/services/slices/movies-slice";
import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "@/components/ui/hover-card";
import moment from "moment";

export const MovieCard = ({
   movieId,
   title,
   rating,
   image,
   genre_ids,
   release_date,
}: MovieCardProps) => {
   const dispatch = useDispatch();
   const { genres: allGenres, favourites } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );
   
   const isBookmarked = favourites.find(
      (favourite) => favourite.movieId === movieId
   );

   const movieDetailRoute = routeConstants.movieDetails.replace(
      ":id",
      String(movieId)
   );

   const genreNames = genre_ids ? genre_ids.map((genreId: number) => {
      const genre = allGenres.find((storedGenre) => storedGenre.id === genreId);
      return genre ? genre.name : "";
   }) : [];

   //NOTE: When a use clicks to a movie detail, we clear the movies in the array so it dont flash in the next movie detail
   const resetMovieList = () => {
      dispatch(clearMovies());
   };

   return (
      <div>
         <Card className="overflow-hidden">
            <CardHeader className="space-y-0 p-0 relative overflow-hidden">
               <Button
                  onClick={() =>
                     dispatch(
                        setFavourites({
                           genre_ids,
                           image,
                           movieId,
                           rating,
                           title,
                           release_date,
                        })
                     )
                  }
                  className={cn(
                     "size-fit p-1.5 absolute top-0 left-0 rounded-[2px] bg-secondary/70 text-secondary-foreground hover:bg-secondary/80 *:size-6",
                     {
                        "": isBookmarked,
                     }
                  )}
               >
                  {isBookmarked ? <BsBookmarkStarFill /> : <BsBookmarkPlus />}
               </Button>

               <Link to={movieDetailRoute} onClick={resetMovieList}>
                  <img
                     alt="Movie poster"
                     className="aspect-square w-full rounded-md rounded-b-none object-cover"
                     src={
                        image
                           ? `https://image.tmdb.org/t/p/w500/${image}`
                           : "https://placehold.co/600x400.png"
                     }
                  />
               </Link>
            </CardHeader>

            <CardFooter className="p-2 pb-4 items-start gap-2 flex-col">
               <HoverCard>
                  <HoverCardTrigger asChild>
                     <div className="w-full grid gap-2">
                        <span className="pt-4 flex flex-wrap gap-x-1 gap-y-2 items-center">
                           {genreNames.slice(0, 2).map((genreName, index) => (
                              <Badge
                                 key={index}
                                 variant={genreName ? "default" : "secondary"}
                              >
                                 {genreName ? genreName : "N/A"}
                              </Badge>
                           ))}
                        </span>

                        <h1 className="ml-2 font-semibold line-clamp-1">
                           {title ? title : "Title not available"}
                        </h1>

                        <span className="flex justify-between">
                           <p className="flex items-center gap-1 font-medium">
                              <AiFillStar className="text-gold size-5" />
                              {parseFloat(String(rating)).toFixed(1)}
                           </p>

                           <Badge variant="secondary">
                              {release_date
                                 ? moment(release_date).year()
                                 : "N/A"}
                           </Badge>
                        </span>
                     </div>
                  </HoverCardTrigger>

                  <HoverCardContent className="space-y-1">
                     <p className="flex gap-1 font-medium">
                        Rating: <AiFillStar className="text-gold size-5" />
                        {parseFloat(String(rating)).toFixed(1)}
                     </p>

                     <p>
                        Title: <b>{title ? title : "Title not available"}</b>
                     </p>

                     <p>
                        Year:{" "}
                        <b>
                           {release_date ? moment(release_date).year() : "N/A"}
                        </b>
                     </p>

                     <p className="flex flex-wrap gap-x-1 gap-y-2 items-center">
                        Genres:
                        {genreNames.map((genreName, index) => (
                           <Badge
                              key={index}
                              variant={genreName ? "default" : "secondary"}
                           >
                              {genreName ? genreName : "N/A"}
                           </Badge>
                        ))}
                     </p>

                     <Link to={movieDetailRoute}>
                        <Button
                           size="sm"
                           variant="secondary"
                           className="mt-2.5 w-full"
                        >
                           View More
                        </Button>
                     </Link>
                  </HoverCardContent>
               </HoverCard>

               <Link
                  to={movieDetailRoute}
                  onClick={resetMovieList}
                  className="w-full"
               >
                  <Button size="sm" variant="secondary" className="w-full">
                     View More
                  </Button>
               </Link>
            </CardFooter>
         </Card>
      </div>
   );
};
