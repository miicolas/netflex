<script setup lang="ts">
import {Bookmark, Info, Star} from "lucide-vue-next";
import {getGenres} from "../lib/api/content";
import {computed, defineProps, onMounted, ref} from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps<{
  trending: {
    name: string | null;
    title: string | null;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    duration: string;
    vote_average: number;
    media_type: 'tv' | 'movie';
  } | null;
}>();

const genre = ref<string[]>([]);

onMounted(async () => {
  if (props.trending) {
    const genres = await getGenres({ids: props.trending.genre_ids, media_type: props.trending.media_type});
    genre.value = genres.map((g: { name: string }) => g.name);
  }
});

const backgroundImage = computed(() => {
  return props.trending
      ? `url(https://image.tmdb.org/t/p/original/${props.trending.backdrop_path})`
      : '';
});
</script>

<template>
  <div
      v-if="props.trending"
      class="w-full h-[60vh] relative bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/70 before:to-transparent rounded-lg"
      :style="{ backgroundImage }"
  >
    <div class="absolute bottom-0 left-0 text-white z-10 space-y-2 p-4 gap-4">
      <div class="relative flex flex-col gap-2">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">{{ props.trending.name  || props.trending.title }}</h1>
        <p class="text-gray-300 text-lg max-w-2xl">
          {{ props.trending.overview }}
        </p>
        <div class="flex items-start gap-2 text-sm">
          {{ genre.join(" • ") }}
          •
          <p class="flex items-center gap-2">
            <Star class="w-5 h-5 text-yellow-400 mr-1"/>
            {{ props.trending.vote_average }}
          </p>
        </div>
        <div class="flex items-center gap-4 mt-4">
          <button class="bg-red-600 text-white p-2 gap-2 rounded-lg flex items-center border border-red-700">
            <Bookmark/>
            <p class="hidden md:block">Télécharger</p>
          </button>
          <RouterLink :to="`/details/${props.trending.id}/${props.trending.media_type}`"
                      class="bg-red-600 text-white p-2 gap-2 rounded-lg flex items-center border border-red-700 h-fit w-fit">
            <Info/>
            <p class="hidden md:block">En savoir plus</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>