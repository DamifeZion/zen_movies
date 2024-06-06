type MovieSliceMovieType = {
   page: number;
   results: [];
   total_pages: number;
   total_results: number;
};

export interface MoviesSliceProps {
   movies: MovieSliceMovieType;
   recommendations: MovieSliceMovieType;
   genres: Array<MovieGenreType>;
   favourites: MovieCardProps[];
   movieDetail: MovieDetailType;
   isLoading: boolean;
   error: string;
}

export type MovieDetailType = {
   adult?: boolean;
   backdrop_path?: string;
   belongs_to_collection?: {
      id: number;
      name: string;
      poster_path: string;
   };
   budget?: number;
   genres?: []; // replace with your Genre type if you have one
   homepage?: string;
   id?: number;
   imdb_id?: string;
   origin_country?: Array<string>;
   original_language?: string;
   original_title?: string;
   overview?: string;
   popularity?: number;
   poster_path?: string;
   production_companies?: [];
   production_countries?: [];
   release_date?: string;
   revenue?: number;
   runtime?: number;
   spoken_languages?: [];
   status?: string;
   tagline?: string;
   title?: string;
   video?: boolean;
   vote_average?: number;
   vote_count?: number;
};

type Breakpoint = "xsm" | "sm" | "md" | "lg";
type QueryType = "min-width" | "max-width";

export interface UseMediaScreenProps {
   breakpoint?: Breakpoint;
   queryType?: QueryType;
   customBreakpoint?: string;
}

export type ComboBoxDataType = {
   label?: string;
   value: string;
};

export interface ComboBoxProps {
   array: ComboBoxDataType[];
   defaultValue?: string;
   placeholder?: string;
   onValueChange?: (value: string) => void;
   renderItem?: (item: ComboBoxDataType) => React.ReactNode;
   allowSearch?: boolean;
   side?: "top" | "bottom" | "left" | "right";
   triggerClassName?: string;
   popoverContentClassName?: string;
   drawerContentClassName?: string;
   commandItemClassName?: string;
   currentValue?: string;
}

export interface NavbarSliceProps {
   showSearchBar: boolean;
}

export type MovieGenreType = {
   id: number;
   name: string;
};

export interface MovieCardProps {
   movieId: string | number;
   rating: number;
   title: string;
   image: string;
   genre_ids: Array<number>;
   release_date: string;
}

export interface MovieApiData {
   backdrop_path: string;
   id: number;
   original_title: string;
   overview: string;
   poster_path: string;
   media_type: string;
   adult: boolean;
   title: string;
   original_language: string;
   genre_ids: number[];
   popularity: number;
   release_date: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}

export interface DynamicPaginationProps {
   pageRoute: string;
   multipleQueries?: boolean;
}
