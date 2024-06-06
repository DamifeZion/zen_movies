import { Button } from "@/components/ui/button";
import { routeConstants } from "@/constants/routeConst";
import { StoreRootState } from "@/services/store";
import { MovieGenreType } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const GenreChips = () => {
   const navigate = useNavigate();
   const { genre: genreParam } = useParams() as { genre: string };
   const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
   const { genres: allGenres } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   //NOTE: On component mount, check if there are any genres in the URL and set it.
   useEffect(() => {
      if (genreParam) {
         const genresInUrl = decodeURI(genreParam).split("|");
         setSelectedGenres(genresInUrl);
      }
   }, [genreParam]);

   const handleSelectGenre = (genreName: string) => {
      setSelectedGenres((prevGenres) => {
         if (prevGenres.includes(genreName)) {
            return prevGenres.filter((genre) => genre !== genreName);
         } else {
            return [...prevGenres, genreName];
         }
      });
   };

   const handleFilter = () => {
      if (selectedGenres.length) {
         return navigate(
            `${routeConstants.genreMovie.replace(":genre", encodeURI(selectedGenres.join("|")))}`
         );
      }

      toast.error("Please select a genre to filter");
   };

   return (
      <div className="flex items-center flex-wrap gap-2">
         <h1 className="text-xl font-semibold">Genres: </h1>

         {allGenres.map((genre: MovieGenreType, index: number) => (
            <Button
               key={index}
               size="sm"
               variant={
                  selectedGenres.includes(genre.name) ? "secondary" : "outline"
               }
               onClick={() => handleSelectGenre(genre.name)}
               className="border"
            >
               {genre.name}
            </Button>
         ))}

         <div className="flex items-center gap-2">
            <Button onClick={handleFilter} className="size-fit py-1.5 px-4">
               Filter
            </Button>

            <Button
               variant="destructive"
               onClick={() => navigate(routeConstants.home)}
               className="size-fit gap-1 py-1.5 px-4"
            >
               Reset <X className="size-4" />
            </Button>
         </div>
      </div>
   );
};
