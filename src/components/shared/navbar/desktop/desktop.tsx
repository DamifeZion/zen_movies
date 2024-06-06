import { NavLink } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { routeConstants } from "@/constants/routeConst";
import { Button } from "@/components/ui/button";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { Badge } from "@/components/ui/badge";
import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

export const PCNavbar = () => {
   const { isPathActive } = useCurrentPath();
   const { favourites } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   return (
      <div className="col-span-2 grid grid-cols-2 items-center">
         <SearchBar />

         <div className="flex justify-end">
            <NavLink to={routeConstants.favourite}>
               <Button
                  size="sm"
                  variant={
                     isPathActive(routeConstants.favourite)
                        ? "default"
                        : "secondary"
                  }
                  className="relative py-1.5 max-400:h-fit max-400:text-sm"
               >
                  Favourites{" "}
                  <Badge
                     variant="destructive"
                     className={cn(
                        "px-1.5 py-0.5 absolute -top-0.5 -left-4 transition-all ease-linear duration-75 visible opacity-100",
                        {
                           "invisible opacity-0":
                              isPathActive(routeConstants.favourite) ||
                              !favourites.length,
                        }
                     )}
                  >
                     {favourites.length}
                  </Badge>
               </Button>
            </NavLink>
         </div>
      </div>
   );
};
