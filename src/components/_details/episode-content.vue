<script setup lang="ts">
import {defineProps, onMounted, ref, watch} from "vue";
import type { Episode, TVShow } from "../../lib/type.ts";
import {getSeasons} from "../../lib/api/content.ts";


const {media, isTV} = defineProps({
  media: Object,
  isTV: Boolean,
});

const episodesBySeason = ref({episodes: [<Episode>{}]});
const selectedSeason = ref(1);



const loadTVEpisode = async (id: string, seasonNumber: number) => {
  if (isTV) {
    const data = await getSeasons({id, season_number: seasonNumber});
    episodesBySeason.value ={
      ...data,
      episodes : data.episodes.filter((episode: any) => episode.still_path && episode.overview && episode.runtime && episode.name)
    };
  }
}

watch(() => selectedSeason.value, async (newSeason) => {
  const id = Array.isArray(media?.id) ? media?.id[0] : media?.id;
  await loadTVEpisode(id as string, newSeason);
});

onMounted(async () => {
  const id = Array.isArray(media?.id) ? media?.id[0] : media?.id;
  await loadTVEpisode(id as string, selectedSeason.value);
});





</script>

<template>
  <div class="min-h-screen bg-[#141414] text-gray-100 p-6" v-if="isTV">
    <div class="max-w-5xl mx-auto space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ media?.name }}</h1>
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
             :key="episode?.id"
             class="group flex gap-4 p-4 hover:bg-[#2b2b2b] rounded-lg transition-colors duration-200"
        >
          <div  class="flex flex-col md:flex-row gap-4 p-4 rounded-lg w-full">

            <img
                :src="`https://image.tmdb.org/t/p/w500${episode.still_path}`"
                :alt="episode.name"
                class="h-full object-cover rounded"
            />


            <div class="flex-1 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-medium">{{ episode.episode_number }}. {{ episode.name }}</h3>
                <span class="text-gray-400">{{ episode.runtime }}m</span>
              </div>
              <p class="text-gray-400">{{ episode.overview || "Pas de description disponible." }}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>