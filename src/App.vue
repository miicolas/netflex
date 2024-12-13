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

    <div v-for="movie in movies.slice(1)" v-bind:key="movie.id">
      <p>{{ movie.title }}</p>
    </div>
  </main>
</template>

<style scoped></style>
