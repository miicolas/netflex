<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import type { MediaContent } from "../lib/type.ts";

const props = defineProps<{
  id: number;
  name: string;
  poster_path: string;
  media_type: MediaContent;
}>();
</script>

<template>
  <RouterLink :to="`/details/${props.id}/${props.media_type}`" class="w-fit cursor-pointer hover:scale-105">
    <div class="flex gap-4 w-fit">
      <img :src="`https://image.tmdb.org/t/p/w500/${props.poster_path}`" class="w-40 rounded-lg" :alt="props.name"/>
    </div>
  </RouterLink>
</template>