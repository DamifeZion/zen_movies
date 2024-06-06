import { LoadingMovieCard } from "../shared/movie-card/LoadingMovieCard";
import { Skeleton } from "../ui/skeleton";

export const MovieDetailLoading = () => {
   const slides = 7;

   return (
      <div className="">
         <Skeleton className="min-h-[500px] w-full border" />

         <div className="container mt-10">
            <div className="space-y-6">
               <h1 className="text-2xl font-semibold ">Recommendations</h1>

               <div className="flex items-center gap-4 overflow-hidden *:sm:min-w-[240px] *:min-w-[200px]">
                  {Array.from({ length: slides }).map((_, index) => (
                     <LoadingMovieCard key={index} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
