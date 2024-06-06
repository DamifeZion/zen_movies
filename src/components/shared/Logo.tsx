import { routeConstants } from "@/constants/routeConst";
import { Link } from "react-router-dom";




const Logo = () => {

   return (
      <Link to={routeConstants.home} className="max-lg:flex-grow">
         <h1 className="font-bold text-2xl text-balance">
            Zen Movies
         </h1>
      </Link>
   )
}


export default Logo;