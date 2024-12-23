<script setup lang="ts">
import {defineProps} from "vue";
import type {TVShow} from "../../lib/type.ts";

const { media, isTV } = defineProps({
  media: Object,
  isTV: Boolean,
});

</script>

<template>
  <template v-if="isTV">
    <section class="p-8">
      <h2 class="text-2xl font-bold text-white mb-4">Saisons</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
            v-for="season in (media as TVShow).seasons"
            :key="season.id"
            class="bg-zinc-800 rounded-lg p-4"
        >
          <img
              v-if="season.poster_path"
              :src="`https://image.tmdb.org/t/p/w200/${season.poster_path}`"
              :alt="season.name"
              class="w-full rounded-lg mb-2"
          />
          <h3 class="text-white font-semibold">{{ season.name }}</h3>
          <p class="text-gray-400 text-sm">{{ season.episode_count }} épisodes</p>
        </div>
      </div>
    </section>
  </template>
</template>
