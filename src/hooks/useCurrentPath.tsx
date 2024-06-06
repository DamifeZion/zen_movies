import { useLocation } from "react-router-dom";

export const useCurrentPath = () => {
   const { pathname } = useLocation();

   const isPathActive = (link: string) => {
      return pathname === link;
   };

   return {
      isPathActive,
   };
};
