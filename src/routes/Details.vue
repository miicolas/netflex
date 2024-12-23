<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, Plus, ArrowLeftIcon, Home} from 'lucide-vue-next'
import { getContent, recommendedMovies } from '../lib/api/content'
import { RouterLink } from 'vue-router'
import { MediaContent, Movie, TVShow } from '../lib/type.ts'

const route = useRoute()
const media = ref<MediaContent | null>(null)
const similar = ref<any[]>([])
const isSmallScreen = ref(window.innerWidth < 640)

const isTV = computed(() => route.params.type === 'tv')

const mediaTitle = computed(() => {
  if (!media.value) return ''
  return isTV.value ? (media.value as TVShow).name : (media.value as Movie).title
})

const mediaRuntime = computed(() => {
  if (!media.value) return 0
  if (isTV.value) {
    const show = media.value as TVShow
    return show.episode_run_time[0] || 0
  }
  return (media.value as Movie).runtime
})

const mediaReleaseDate = computed(() => {
  if (!media.value) return ''
  if (isTV.value) {
    return (media.value as TVShow).first_air_date
  }
  return (media.value as Movie).release_date
})

watch(route, () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  media.value = null
  similar.value = []
  loadMediaDetails(id as string )
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const loadRecommendedMedia = async (id: string) => {
  const mediaType = isTV.value ? 'tv' : 'movie'
  console.log(isTV.value, 'isTV')
  const data = await recommendedMovies({ id, media_type: mediaType })
  similar.value = data.results?.slice(0, 6) || []
}

const loadMediaDetails = async (id: string) => {
  const mediaType = isTV.value ? 'tv' : 'movie'
  media.value = await getContent({ id, media_type: mediaType }) as MediaContent
  if (media.value) {
    await loadRecommendedMedia(id)
  }
}

const truncatedOverview = computed(() => {
  const maxLength = isSmallScreen.value ? 100 : 500
  if (media.value && media.value.overview.length > maxLength) {
    return media.value.overview.substring(0, maxLength) + '...'
  }
  return media.value?.overview || ''
})

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640
}

window.addEventListener('resize', updateScreenSize)

onMounted(async () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  await loadMediaDetails(id as string)
  updateScreenSize()
})
</script>

<template>
  <div class="absolute top-8 left-8 text-white cursor-pointer z-30 flex items-center justify-center gap-2">
    <ArrowLeftIcon class="w-8 h-8" @click="$router.back()" />
    <Home class="w-8 h-8" @click="$router.push('/')" />
  </div>
  <main v-if="media" class="min-h-screen bg-zinc-900">
    <div class="relative h-[70vh]">
      <img
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
              <span>{{ media.vote_average.toFixed(1) }}</span>
            </div>
            <span>•</span>
            <span>{{ mediaRuntime }}min</span>
            <span>•</span>
            <span>{{ formatDate(mediaReleaseDate) }}</span>
            <template v-if="isTV">
              <span>•</span>
              <span>{{ (media as TVShow).number_of_seasons }} saisons</span>
            </template>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
                v-for="genre in media.genres"
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
  </main>
</template>