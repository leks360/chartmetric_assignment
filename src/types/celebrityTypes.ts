export interface CelebrityType {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: Knownfor[];
  }
  export interface Knownfor {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name?: string;
    original_language: string;
    original_name?: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: (number | number)[];
    popularity: number;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
    title?: string;
    original_title?: string;
    release_date?: string;
    video?: boolean;
  }