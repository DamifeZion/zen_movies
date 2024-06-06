import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/shared/navbar/Navbar";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { routeConstants } from "./constants/routeConst";
import { GenreMovies } from "./pages/GenreMovies";
import SearchResult from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Footer from "./components/shared/Footer";
import MovieDetails from "./pages/MovieDetails";

function App() {
   return (
      <section className="flex flex-col">
         <Router>
            <div className="bg-background shadow-sm sticky inset-0 z-20">
               <Navbar />
            </div>

            <Routes>
               <Route index element={<Home />} />
               {/* NOTE: The route routeConstants.movies looks cleaner when in home page ans user searching for movies per page */}
               <Route index path={routeConstants.movies} element={<Home />} />

               <Route
                  path={routeConstants.favourite}
                  element={<Favourites />}
               />

               <Route
                  path={routeConstants.genreMovie}
                  element={<GenreMovies />}
               />

               <Route
                  path={routeConstants.movieDetails}
                  element={<MovieDetails />}
               />

               <Route
                  path={routeConstants.searchResult}
                  element={<SearchResult />}
               />

               <Route
                  path={routeConstants.notFound}
                  element={<NotFound />}
               />
            </Routes>

            <div className="mt-auto">
               <Footer />
            </div>
         </Router>
      </section>
   );
}

export default App;
