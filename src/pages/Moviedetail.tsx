import { MovieDetailLoading } from "@/components/movie-details/MovieDetaiLoading";
import { MovieCard } from "@/components/shared/movie-card/MovieCard";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
   CarouselApi,
} from "@/components/ui/carousel";
import { useGetMovieDetailsAndRecommendations } from "@/hooks/useFetchMovieData";
import { StoreRootState } from "@/services/store";
import { MovieApiData, MovieGenreType } from "@/types";
import moment from "moment";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { setFavourites } from "@/services/slices/movies-slice";
import { GenreChips } from "@/components/shared/genres/GenreChips";

const MovieDetail = () => {
   useGetMovieDetailsAndRecommendations();

   const dispatch = useDispatch()
   const { movieDetail, isLoading, recommendations, favourites } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   const [api, setApi] = useState<CarouselApi>();
   const [currentSlide, setCurrentSlide] = useState(0);
   const [count, setCount] = useState<number>(0);
   const [, setTranslatePercentage] = useState(0);

   const [searchParams, setSearchParams] = useSearchParams();

   const recommendationPage =
      Number(searchParams.get("recommendation_page")) || 1;


   const isBookmarked = favourites.find(
      (favourite) => favourite.movieId === movieDetail.id
   );

   useEffect(() => {
      if (!api) {
         return;
      }

      const totalSlideItem = api.slideNodes();
      setCount(totalSlideItem.length);

      api.on("select", () => {
         setCurrentSlide(api.selectedScrollSnap() + 1);
      });
   }, [api]);

   useEffect(() => {
      if (currentSlide === 1) {
         return setTranslatePercentage(0);
      }

      setTranslatePercentage(((currentSlide - 1) / (count - 1)) * 200);
   }, [count, currentSlide]);

   if (isLoading) return <MovieDetailLoading />;

   const goToNextRecommendationsPage = () => {
      if (recommendationPage !== recommendations.total_pages) {
         setSearchParams({
            recommendation_page: String(recommendationPage + 1),
         });
      }
   };

   const goToPreviousRecommendationsPage = () => {
      if (recommendationPage !== 1) {
         setSearchParams({
            recommendation_page: String(recommendationPage - 1),
         });
      }
   };

   return (
      <div className="pb-6">

         <div
            style={{
               backgroundImage: `url(${movieDetail.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path}`
                  : "https://placehold.co/600x400.png"
                  })`,
            }}
            className="w-full bg-no-repeat bg-center bg-cover"
         >
            <div className="w-full py-8 flex flex-wrap bg-black/70 backdrop-blur-sm md:py-12 lg:py-16">
               <div className="container flex flex-wrap items-center sm:justify-center sm:gap-x-6 sm:flex-nowrap md:gap-x-10 lg:gap-x-20">
                  <img
                     src={
                        movieDetail.poster_path
                           ? `https://image.tmdb.org/t/p/w1280/${movieDetail.poster_path}`
                           : "https://placehold.co/600x400.png"
                     }
                     className="w-[300px] rounded-md object-cover"
                  />

                  <div className="text-primary-foreground">
                     <h1 className="mt-3 font-bold text-3xl">
                        {movieDetail.title ? movieDetail.title : "N/A"}
                     </h1>

                     <ul className="mt-3 flex items-center list-disc font-semibold">
                        <li className="flex items-center gap-1 font-medium">
                           <AiFillStar className="text-gold size-5" />
                           {parseFloat(
                              String(movieDetail.vote_average)
                           ).toFixed(1)}
                        </li>

                        <li className="ml-6 text-muted-foreground">
                           {movieDetail.runtime
                              ? movieDetail.runtime + "m"
                              : "N/A"}
                        </li>

                        <li className="ml-6 text-muted-foreground">
                           {movieDetail.release_date
                              ? moment(movieDetail.release_date).year()
                              : "N/A"}
                        </li>
                     </ul>

                     <h6 className="mt-3">
                        <b>Genres: </b>{" "}
                        {movieDetail.genres
                           ? movieDetail.genres
                              .map((genre: MovieGenreType) => genre.name)
                              .join(", ")
                           : "N/A"}
                     </h6>

                     <p className="mt-3 leading-normal">
                        <b>Tagline:</b>{" "}
                        {movieDetail.tagline ? movieDetail.tagline : "N/A"}
                     </p>

                     <p className="mt-3 leading-normal max-w-lg">
                        <b>Overview:</b>{" "}
                        {movieDetail.overview ? movieDetail.overview : "N/A"}
                     </p>

                     <div className="mt-8 flex items-center flex-wrap gap-x-4 gap-y-2">
                        <Button
                           variant={isBookmarked ? "destructive" : 'default'}
                           onClick={() => dispatch(setFavourites({
                              movieId: Number(movieDetail.id),
                              title: String(movieDetail.title),
                              genre_ids: movieDetail.genres ? movieDetail.genres?.map((genre: MovieGenreType) => genre.id) : [],
                              image: String(movieDetail.poster_path),
                              rating: Number(movieDetail.vote_average),
                              release_date: String(movieDetail.release_date)
                           }))}
                        >
                           {isBookmarked ? "Remove favourite" : "Add favourite"}
                        </Button>


                        <a href={movieDetail.homepage} target="_blank">
                           <Button variant="secondary" >
                              View on Netflix
                           </Button>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container my-6">
                           <GenreChips />
                     </div>

                     {recommendations.total_pages > 0 && (
                        <div className="container mt-10">
                           <div className="flex gap-3 items-center justify-between py-2">
                              <h1 className="text-2xl font-semibold ">Recommendations</h1>

                              <div>
                                 {recommendationPage !== 1 && (
                                    <Button
                                       variant="link"
                                       onClick={goToPreviousRecommendationsPage}
                                    >
                                       Prev
                                    </Button>
                                 )}

                                 {recommendationPage !== recommendations.total_pages && (
                                    <Button
                                       variant="link"
                                       onClick={goToNextRecommendationsPage}
                                    >
                                       See more
                                    </Button>
                                 )}
                              </div>
                           </div>

                           <Carousel
                              setApi={setApi}
                              plugins={[Autoplay({ delay: 5000 })]}
                              className="mx-auto"
                           >
                              <CarouselPrevious className="max-2xl:-left-4 z-10" />

                              <CarouselContent className="py-4 px-0">
                                 {recommendations.results.map((movie: MovieApiData) => (
                                    <CarouselItem
                                       key={movie.id}
                                       className="basis-2/3 min-[400px]:basis-2/4 min-[550px]:basis-1/3 md:basis-1/4 lg:basis-1/5"
                                    >
                                       <MovieCard
                                          movieId={movie.id}
                                          rating={movie.vote_average}
                                          title={movie.title}
                                          image={movie.poster_path}
                                          genre_ids={movie.genre_ids}
                                          release_date={movie.release_date}
                                       />
                                    </CarouselItem>
                                 ))}
                              </CarouselContent>

                              <CarouselNext className="max-2xl:-right-4 z-10" />
                           </Carousel>
                        </div>
                     )}
                  </div>
                  );
};

                  export default MovieDetail;
