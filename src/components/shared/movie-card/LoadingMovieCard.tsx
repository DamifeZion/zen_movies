import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingMovieCard = () => {
   return (
      <Card className="overflow-hidden">
         <CardHeader className="space-y-0 p-0 relative overflow-hidden">
            <Skeleton className="aspect-square w-full rounded-md rounded-b-none object-cover" />
         </CardHeader>

         <CardFooter className="p-2 py-4 items-start gap-2 flex-col">
            <span className="flex flex-wrap gap-x-1 gap-y-2 items-center *:w-14 *:h-5">
               <Skeleton />
               <Skeleton />
               <Skeleton />
            </span>

            <Skeleton className="w-full h-5" />

            <span className="flex items-center justify-between gap-1 w-full">
               <Skeleton className="w-14 h-5" />
               <Skeleton className="w-16 h-5" />
            </span>

            <Skeleton className="w-full h-8" />
         </CardFooter>
      </Card>
   )
}

export const LoadingMovieCardGrid = () => {
   const skeletonCount = 19;

   return (
      <div className="container py-8 grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
         {Array.from({ length: skeletonCount }).map((_, index) => (
            <LoadingMovieCard key={index} />
         ))}
      </div>
   );
};
