<!-- src/components/trending-all.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { ChevronRightIcon } from 'lucide-vue-next';
import CarouselView from './carousel-view.vue';
import type { TrendingItem } from "../lib/type.ts";



const props = defineProps<{
  trending: TrendingItem[];
}>();

const movies = props.trending;

</script>

<template>
  <section class="flex flex-col gap-2 py-4">
    <div class="flex gap-4 items-end md:px-9 ">
      <h1 class="text-2xl font-bold">Trending</h1>
      <RouterLink to="/trending/all" class="text-gray-500 flex items-center">
        <p class="hidden md:block">All</p>
        <ChevronRightIcon class="w-6 h-6 text-white" />
      </RouterLink>
    </div>
    <CarouselView :items="movies.map(movie => ({ id: movie.id, name: movie.title || movie.name || '', poster_path: movie.poster_path, media_type: movie.media_type }))" />
  </section>
</template>