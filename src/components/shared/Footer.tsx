import { routeConstants } from "@/constants/routeConst";
import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";




const Footer = () => {
   const { pathname } = useLocation()
   const { movies, recommendations } = useSelector((state: StoreRootState) => state.moviesSlice)

   //NOTE: We want to remove the dynamic parameter at the end to comnditionally render the result counts
   const movieDetailsPath = routeConstants.movieDetails.split(':')[0];

   const moviesPerPage = movies.results.length; // Change this to the actual number of results per page for movies
   const recommendationsPerPage = recommendations.results.length; // Change this to the actual number of results per page for recommendations

   const moviesFirstResultNumber = (movies.page - 1) * moviesPerPage + 1;
   const moviesLastResultNumber = Math.min(movies.page * moviesPerPage, moviesFirstResultNumber + movies.results.length - 1);

   const recommendationsFirstResultNumber = (recommendations.page - 1) * recommendationsPerPage + 1;
   const recommendationsLastResultNumber = Math.min(recommendations.page * recommendationsPerPage, recommendationsFirstResultNumber + recommendations.results.length - 1);


   return (
      <div className="mt-12 py-6 border">
         <ul className="container max-400:flex-col-reverse flex flex-wrap gap-x-4 gap-y-2 items-center text-xs justify-center 400:justify-between sm:text-sm">
            <li>&copy; {new Date().getFullYear()} <Link to={routeConstants.home}><b>Zen Movies</b></Link>. All rights reserved</li>

            {/* NOTE: This will show in all pages. */}
            {!pathname.includes(movieDetailsPath) && (
               <li className="text-muted-foreground [&_b]:text-foreground">
                  Showing <b>{movies.results.length > 0 ? `${moviesFirstResultNumber}-${moviesLastResultNumber}` : '0-0'}</b> of <b>{movies.total_results}</b>
               </li>
            )}

            {/* NOTE: This will only show in the movie details page for the recommendations */}
            {pathname.includes(movieDetailsPath) && (
               <li className="text-muted-foreground [&_b]:text-foreground">
                  Showing <b>{recommendations.results.length > 0 ? `${recommendationsFirstResultNumber}-${recommendationsLastResultNumber}` : '0-0'}</b> of <b>{recommendations.total_results}</b>
               </li>
            )}

         </ul>
      </div>
   )
}


export default Footer;