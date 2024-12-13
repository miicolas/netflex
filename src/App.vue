<script setup>

import {ref, watch} from "vue";

const movies = ref([])



const fetchMovies = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'

    });

    if (!response.ok) {
      throw response
    }

    const data = await response.json()
    console.log(data)

    movies.value = data.results

  } catch (error){
    console.log("There was an error!", error);  }
}

fetchMovies()

watch(movies, (newMovies)=>{
  console.log(newMovies)
})

console.log(movies, 'movies')

</script>

<template>

  <main>
    <div  v-for="movie in movies" v-bind:key="movie.id" >
      <p >{{ movie.title }}</p>
    </div>

  </main>

</template>

<style scoped>

h1 {
  color: red;
}

</style>
