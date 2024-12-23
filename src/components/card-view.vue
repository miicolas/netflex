<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  name: string;
  poster_path: string;
  id: number;
}>();
</script>

<template>
  <RouterLink :to="`/movie/${props.id}`" class="w-fit">
    <div class="flex gap-4 w-fit">
      <img :src="`https://image.tmdb.org/t/p/w500/${props.poster_path}`" class="w-40 rounded-lg" :alt="props.name"/>
    </div>
  </RouterLink>
</template>