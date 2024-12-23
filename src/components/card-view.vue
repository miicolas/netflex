<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

type MediaType = 'tv' | 'movie';

const props = defineProps<{
  name: string;
  poster_path: string;
  id: number;
  media_type: MediaType;
}>();

</script>

<template>
  <RouterLink :to="`/details/${props.id}/${props.media_type}`" class="w-fit">
    <div class="flex gap-4 w-fit">
      <img :src="`https://image.tmdb.org/t/p/w500/${props.poster_path}`" class="w-40 rounded-lg" :alt="props.name"/>
    </div>
  </RouterLink>
</template>