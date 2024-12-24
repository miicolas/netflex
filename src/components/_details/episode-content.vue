<script setup lang="ts">
import {defineProps, onMounted, ref, watch} from "vue";
import type {TVShow} from "../../lib/type.ts";
import {getSeasons} from "../../lib/api/content.ts";

const {media, isTV} = defineProps({
  media: Object,
  isTV: Boolean,
});

const episodesBySeason = ref({episodes: []});
const selectedSeason = ref(1);

const loadTVEpisode = async (id: string, seasonNumber: number) => {
  if (isTV) {
    const data = await getSeasons({id, season_number: seasonNumber});
    episodesBySeason.value = data;
    console.log('Loaded episodes:', data);
  }
}

watch(() => selectedSeason.value, async (newSeason) => {
  const id = Array.isArray(media.id) ? media.id[0] : media.id;
  await loadTVEpisode(id as string, newSeason);
});

onMounted(async () => {
  const id = Array.isArray(media.id) ? media.id[0] : media.id;
  await loadTVEpisode(id as string, selectedSeason.value);
});
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-gray-100 p-6" v-if="isTV">
    <div class="max-w-5xl mx-auto space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ media.name }}</h1>
        <select
            v-model="selectedSeason"
            class="bg-[#2b2b2b] text-white px-4 py-2 rounded-md border border-gray-600 focus:border-gray-400 outline-none"
        >
          <option v-for="season in (media as TVShow).seasons" :key="season.id" :value="season.season_number">
            Saison {{ season.season_number }}
          </option>
        </select>
      </div>

      <div v-if="episodesBySeason.episodes?.length === 0" class="text-center py-12 text-gray-400">
        Aucun épisode disponible pour cette saison
      </div>

      <div v-else class="space-y-4">


        <div v-for="episode in episodesBySeason.episodes"
             :key="episode.id"
             class="group flex gap-4 p-4 hover:bg-[#2b2b2b] rounded-lg transition-colors duration-200"
        >

          <div v-if="!episode.still_path" class="flex gap-4 p-4 rounded-lg w-full">
            <div
                class="flex items-center justify-center bg-neutral-800 text-2xl font-semibold w-80 h-44 object-cover rounded">
              Pas d'image disponible
            </div>
            <div class="flex-1 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-medium">{{ episode.episode_number }}. {{ episode.name }}</h3>

              </div>
              <p class="text-gray-400">
                {{ episode.overview || "Pas de description disponible. | L'épisode n'est pas encore sorti." }}</p>
            </div>


          </div>
          <div v-else class="flex gap-4 p-4 rounded-lg">

            <img
                :src="`https://image.tmdb.org/t/p/w500${episode.still_path}`"
                :alt="episode.name"
                class="w-80 h-44 object-cover rounded"
            />


            <div class="flex-1 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-medium">{{ episode.episode_number }}. {{ episode.name }}</h3>
                <span class="text-gray-400">{{ episode.runtime }}m</span>
              </div>
              <p class="text-gray-400">{{ episode.overview || "Pas de description disponible." }}</p>
              <div class="flex gap-2 mt-2">
                <div v-for="star in episode.guest_stars?.slice(0, 3)" :key="star.id" class="text-sm text-gray-500">
                  {{ star.name }}{{ star.character ? ` (${star.character})` : '' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>