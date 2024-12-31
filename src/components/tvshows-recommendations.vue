<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { ChevronRightIcon } from 'lucide-vue-next';
import CarouselView from './carousel-view.vue';
import type { TrendingItem, MediaContent } from "../lib/type.ts";

const props = defineProps<{
  recommendationsTVShows: TrendingItem[];
}>();

const TVShows = props.recommendationsTVShows ? props.recommendationsTVShows : [];


const recommendationsTVShows = TVShows.map(tvShow => ({
  id: tvShow.id,
  name: tvShow.name || tvShow.title || '',
  poster_path: tvShow.poster_path,
  media_type: 'tv' as MediaContent
}));

console.log(recommendationsTVShows, 'recommendationsTVShows');

</script>

<template>
  <section class="flex flex-col gap-8 py-4 mt-4">
    <div class="flex gap-4 items-end md:px-9">
      <h1 class="text-2xl font-bold">Séries Recommandées</h1>
      <RouterLink to="/trending/all" class="text-gray-500 flex items-center">
        <p class="hidden md:block">All</p>
        <ChevronRightIcon class="w-6 h-6 text-white" />
      </RouterLink>
    </div>
    <CarouselView :items="recommendationsTVShows" />
  </section>
</template>