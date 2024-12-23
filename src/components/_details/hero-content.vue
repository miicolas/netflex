<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Plus, Star } from "lucide-vue-next";
import type { Movie, TVShow } from "../../lib/type.ts";

const props = defineProps<{
  media: Movie | TVShow | null;
  isTV: boolean;
  SmallScreen: boolean;
}>();

const mediaTitle = computed(() => {
  if (!props.media) return '';
  return props.isTV ? (props.media as TVShow).name : (props.media as Movie).title;
});

const mediaRuntime = computed(() => {
  if (!props.media) return 0;
  if (props.isTV) {
    const show = props.media as TVShow;
    return show.episode_run_time?.[0] || 0;
  }
  return (props.media as Movie).runtime || 0;
});

const mediaReleaseDate = computed(() => {
  if (!props.media) return '';
  return props.isTV
      ? (props.media as TVShow).first_air_date
      : (props.media as Movie).release_date;
});

const truncatedOverview = computed(() => {
  const maxLength = props.SmallScreen ? 100 : 500;
  const overview = props.media?.overview || '';
  return overview.length > maxLength ? `${overview.substring(0, maxLength)}...` : overview;
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR');
};
</script>

<template>
  <div class="relative h-[70vh]">
    <img
        v-if="media?.backdrop_path"
        :src="`https://image.tmdb.org/t/p/original/${media.backdrop_path}`"
        :alt="mediaTitle"
        class="w-full h-full object-cover brightness-75 rounded-lg"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

    <div class="absolute bottom-0 left-0 p-8 w-full">
      <div class="max-w-4xl space-y-4">
        <h1 class="text-4xl md:text-6xl font-bold text-white">{{ mediaTitle }}</h1>

        <div class="flex items-center gap-4 text-gray-200">
          <div class="flex items-center">
            <Star class="w-5 h-5 text-yellow-400 mr-1" />
            <span>{{ media?.vote_average?.toFixed(1) }}</span>
          </div>
          <span>•</span>
          <span>{{ mediaRuntime }} min</span>
          <span>•</span>
          <span>{{ formatDate(mediaReleaseDate) }}</span>
          <template v-if="isTV">
            <span>•</span>
            <span>{{ (media as TVShow).number_of_seasons }} saisons</span>
          </template>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
              v-for="genre in media?.genres || []"
              :key="genre.id"
              class="px-3 py-1 bg-red-600 rounded-full text-sm text-white"
          >
            {{ genre.name }}
          </span>
        </div>

        <p class="text-gray-300 text-lg max-w-2xl">
          {{ truncatedOverview }}
        </p>

        <button class="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          <Plus class="w-5 h-5" />
          Ma Liste
        </button>
      </div>
    </div>
  </div>
</template>
