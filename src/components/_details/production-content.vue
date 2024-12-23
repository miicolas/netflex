<script setup lang="ts">

import {defineProps} from "vue";

const { media } = defineProps<{
  media: any
}>()


</script>

<template>
  <section class="p-8">
    <h2 class="text-2xl font-bold text-white mb-4">Production</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
          v-for="company in media.production_companies"
          :key="company.id"

          class="bg-zinc-800 rounded-lg p-4 flex items-center justify-center h-24"
      >
        <img
            v-if="company.logo_path"
            :src="`https://image.tmdb.org/t/p/original/${company.logo_path}`"
            :alt="company.name"
            class="max-h-16 object-contain"
        />
        <span v-else class="text-white text-center">{{ company.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>