export type MoviesResponse = {
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
    release_date?: string;
  }>;
  total_pages: number;
};

export type TvResponse = {
  results: Array<{
    id: number;
    name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type GenreResponse = {
  results: Array<{
    id: number;
    original_title?: string;
    name?: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type DetailsResponse = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  runtime?: number;
  status?: string;
  genres?: Array<{ name: string }>;
  tagline?: string;
};

export type TrailersResponse = {
  videos: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type SeasonsResponse = {
  id: number;
  name: string;
  seasons: Array<{
    id: number;
    name: string;
    season_number: number;
    poster_path: string | null;
    air_date: string;
  }>;
};

export type EpisodeResponse = {
  name: string;
  air_date: string;
  overview: string;
  episodes: Array<{
    id: number;
    name: string;
    still_path: string | null;
    episode_number: number;
    air_date: string;
  }>;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type PersonResponse = {
  id: number;
  name: string;
  biography: string;
  place_of_birth: string;
  birthday: string;
  profile_path: string;
  deathday: string | null;
  known_for_department: string;
};

export type CareerResponse = {
  cast: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    character: string;
    media_type: string;
  }>;
};

export type ImagesResponse = {
  profiles: Array<{
    file_path: string;
  }>;
};

export type SearchResponse = {
  results: Array<{
    id: number;
    name?: string;
    title?: string;
    profile_path: string | null;
    poster_path?: string | null;
    release_date?: string;
  }>;
  total_pages: number;
  total_results: number;
};
