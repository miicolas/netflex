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

export async function getGenres({ ids }: { ids: number[] }) {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=fr-FR", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    });
    const data = await response.json();
    const genres = data.genres.filter((genre: { id: number }) => ids.includes(genre.id));
    return genres;
}

export async function getContent({ id }: { id: string }) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_BEARER_TOKEN}`,
        },
    }).then((res) => {
        return res.json();
    });
}

export async function similarMovies({ id }: { id: string }) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=fr-FR`, {
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

export async function recommendedMovies({ id }: { id: string }) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=fr-FR`, {
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