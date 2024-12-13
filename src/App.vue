<script setup>
import HomePopular from "@/components/home-popular.vue";
import { ref, watch } from "vue";

const movies = ref([]);
const top1 = ref();

const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=fr-FR`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    console.log(data);

    movies.value = data.results;
    top1.value = data.results[0];
  } catch (error) {
    console.log("There was an error!", error);
  }
};

fetchMovies();

watch(movies, (newMovies) => {
  console.log(newMovies);
});

watch(top1, (newTop1) => {
  console.log("Top 1 has changed:", newTop1);
});
</script>

<template>
  <main>
    <HomePopular v-if="top1" :top1="top1" />
    <section class="container-popular">
      <h1>Populaires en ce moment</h1>
      <div>
        <div
          v-for="movie in movies.slice(1)"
          :key="movie.id"
          class="movie-card"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <p class="movie-title">{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

.container-popular {
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
}

/* Grille de films */
div {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

/* Style des cartes */
.movie-card {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease;
  background: #141414;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
  z-index: 1;
}

/* Image du film */
.movie-poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
}

/* Conteneur des informations */
.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-info {
  transform: translateY(0);
}

/* Titre du film */
.movie-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Media queries pour la responsivité */
@media (max-width: 768px) {
  div {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .movie-info {
    padding: 0.75rem;
  }

  .movie-title {
    font-size: 0.9rem;
  }
}
</style>
