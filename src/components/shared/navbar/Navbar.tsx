import { useMediaScreen } from "@/hooks/useMediaScreen";
import { PCNavbar } from "./desktop/desktop";
import { NavLink } from "react-router-dom";
import { routeConstants } from "@/constants/routeConst";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { FcSearch } from "react-icons/fc";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { setShowSearchBar } from "@/services/slices/navbarSlice";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import { Badge } from "@/components/ui/badge";
import Logo from "../Logo";

export const Navbar = () => {
   const dispatch = useDispatch();
   const { isPathActive } = useCurrentPath();
   const isMobile = useMediaScreen({ breakpoint: "lg" });
   const { showSearchBar } = useSelector(
      (state: StoreRootState) => state.navbarSlice
   );
   const { favourites } = useSelector(
      (state: StoreRootState) => state.moviesSlice
   );

   return (
      <header className="container pt-0">
         <nav className="min-h-16 py-2 flex flex-col justify-center gap-2">
            <ul className="flex items-center lg:grid lg:grid-cols-3">
               <Logo />

               {isMobile && (
                  <div className="flex items-center gap-4">
                     <Toggle
                        pressed={showSearchBar}
                        onPressedChange={() => dispatch(setShowSearchBar())}
                        className="size-fit p-1.5"
                     >
                        <FcSearch className="size-6" />
                     </Toggle>

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
                                 "px-1.5 py-0.5 absolute -top-0.5 -left-3 transition-all ease-linear duration-100 visible opacity-100",
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
               )}

               {!isMobile && <PCNavbar />}
            </ul>

            {isMobile && (
               <ul
                  className={cn(
                     "invisible opacity-0 transition-all h-0 overflow-hidden ease-linear duration-100",
                     {
                        "visible opacity-100 h-auto": showSearchBar,
                     }
                  )}
               >
                  <SearchBar />
               </ul>
            )}
         </nav>
      </header>
   );
};
