import { UseMediaScreenProps } from "@/types";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export const useMediaScreen = ({
   breakpoint,
   queryType = "max-width",
   customBreakpoint,
}: UseMediaScreenProps): boolean => {
   const [mediaQuery, setMediaQuery] = useState<string>("");

   useEffect(() => {
      const breakpointValues = {
         xsm: 480,
         sm: 640,
         md: 768,
         lg: 1023,
      };

      const width =
         customBreakpoint ||
         (breakpoint && `${breakpointValues[breakpoint]}px`);
      setMediaQuery(`(${queryType}: ${width})`);
   }, [customBreakpoint, breakpoint, queryType]);

   return useMediaQuery(mediaQuery);
};
