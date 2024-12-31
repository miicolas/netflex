<script setup lang="ts">
import HeaderNavbar from "../components/header-navbar.vue";
import MainShowcase from "../components/main-showcase.vue";
import { ref, onMounted } from 'vue';
import { getTrending , getMoviesRecommendations, getTVShowsRecommendations} from "../lib/api/content.ts";
import TrendingAll from "../components/trending-all.vue";
import RecommendationMovies from "../components/movies-recommendations.vue";
import RecommendationTVShows from "../components/tvshows-recommendations.vue";


const mainShowcase = ref(null);
const trending = ref(null);
const recommendationsMovies = ref(null);
const recommendationsTVShows = ref(null);

onMounted(async () => {
  const data = await getTrending();
  const fetchRecommendationsMovies = await getMoviesRecommendations();
  const fetchRecommendationsTVShows = await getTVShowsRecommendations();
  mainShowcase.value = data.results[0];
  trending.value = data.results.slice(1);
  recommendationsMovies.value = fetchRecommendationsMovies.results;
  recommendationsTVShows.value = fetchRecommendationsTVShows.results;

});
</script>

<template>

    <div class="relative">
      <div class="absolute top-0 left-0 w-full z-20 p-4">
        <HeaderNavbar/>
      </div>
      <MainShowcase v-if="trending" :trending="mainShowcase"/>
      <div v-else>Loading...</div>
      <TrendingAll v-if="trending" :trending="trending"/>
      <RecommendationMovies v-if="recommendationsMovies" :recommendationsMovies="recommendationsMovies"/>
      <RecommendationTVShows v-if="recommendationsTVShows" :recommendationsTVShows="recommendationsTVShows"/>
    </div>


</template>