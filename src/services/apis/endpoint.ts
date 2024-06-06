export const api = {
   trending: "/trending/all/day?language=en-US&page=:page",
   genres: "/genre/movie/list?language=en",
   movieByGenre: "/discover/movie?page=:page&with_genres=:genres",
   searchMovie:
      "/search/movie?include_adult=false&language=en-US&query=:query&page=:page",
   movieDetail: "/movie/:movie_id",
   movieRecommendation:
      "/movie/:movie_id/recommendations?language=en-US&page=:page",
};
