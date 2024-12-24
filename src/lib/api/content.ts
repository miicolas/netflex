console.log(import.meta.env.VITE_API_TMDB_BEARER_TOKEN, "import.meta.env.VITE_API_TMDB_BEARER_TOKEN");

export async function getTrending() {
    return fetch("https://api.themoviedb.org/3/trending/all/day?language=fr-FR", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        return res.json();
    });
}

export async function getGenres({ ids, media_type }: { ids: number[], media_type: 'tv' | 'movie' }) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/${media_type}/list?language=fr-FR`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
            },
        });
        const data = await response.json();

        if (!data.genres || !Array.isArray(data.genres)) {
            throw new Error('Invalid genres data');
        }

        const genres = data.genres.filter((genre: { id: number }) => ids.includes(genre.id));
        return genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
}

export async function getContent({ id, media_type }: { id: string, media_type: 'tv' | 'movie' }) {
    return fetch(`https://api.themoviedb.org/3/${media_type}/${id}?language=fr-FR`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        return res.json();
    });
}

export async function recommendedMovies({ id, media_type}: { id: string, media_type: 'tv' | 'movie' }) {
    return fetch(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?language=fr-FR`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        console.log(res);
        return res.json();
    });
}

export const searchContent = async (query: string) => {
    return fetch(`https://api.themoviedb.org/3/search/multi?language=fr-FR&query=${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        return res.json();
    });
}

export const getSeasons = async ({ id, season_number }: { id: string, season_number: number }) => {
    return fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=fr-FR`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        return res.json();
    });
}
