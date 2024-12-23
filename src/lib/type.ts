export interface MediaBase {
    id: number
    backdrop_path: string
    vote_average: number
    overview: string
    genres: { id: number; name: string }[]
    production_companies: { id: number; name: string; logo_path: string }[]
}

export interface Movie extends MediaBase {
    title: string
    runtime: number
    release_date: string
    imdb_id: string
}

export interface TVShow extends MediaBase {
    name: string
    episode_run_time: number[]
    first_air_date: string
    last_air_date: string
    number_of_episodes: number
    number_of_seasons: number
    seasons: {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
    }[]
}

export type MediaContent = Movie | TVShow

export interface TrendingItem {
    title: string | null;
    name: string | null;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    duration: string;
    popularity: number;
    media_type: MediaContent;
}