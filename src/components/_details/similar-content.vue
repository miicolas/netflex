<script setup lang="ts">

import {RouterLink} from "vue-router";
import {defineProps} from "vue";


const {similar, isTV} = defineProps<{
  similar: Array<any>,
  isTV: boolean
}>()


</script>

<template>
  <section v-if="similar.length" class="p-8">
    <h2 class="text-2xl font-bold text-white mb-4">{{ isTV ? 'Séries Similaires' : 'Films Similaires' }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <RouterLink
          :to="`/details/${item.id}/${isTV ? 'tv' : 'movie'}`"
          v-for="item in similar"
          :key="item.id"
      >
        <div class="aspect-[2/3] rounded-lg overflow-hidden hover:scale-105 transition duration-300">
          <img
              :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
              :alt="item.title || item.name"
              class="w-full h-full object-cover"
          />
        </div>
      </RouterLink>
    </div>
  </section>
</template>