import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const serverUrl = import.meta.env.VITE_TMDB_URL as string;

export const baseQuery = fetchBaseQuery({
   baseUrl: serverUrl,

   prepareHeaders: (headers) => {
      headers.set("accept", "application/json");

      const token = import.meta.env.VITE_BEARER_TOKEN as string;
      if (token && !headers.has("Authorization")) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
   },
});
