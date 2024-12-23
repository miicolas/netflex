<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, Plus, ArrowLeftIcon, Home} from 'lucide-vue-next'
import { getContent, recommendedMovies } from '../lib/api/content'
import { RouterLink } from 'vue-router'

interface Movie {
  title: string
  backdrop_path: string
  vote_average: number
  runtime: number
  release_date: string
  genres: { id: number; name: string }[]
  overview: string
  production_companies: { id: number; name: string; logo_path: string }[]
  imdb_id: string
}

const route = useRoute()
const movie = ref<Movie | null>(null)
const similar = ref<any[]>([])
const isSmallScreen = ref(window.innerWidth < 640)

watch(route, () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  movie.value = null
  similar.value = []
  loadMovieDetails(id)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const loadRecommendedMovies = async (id: string) => {
  const data = await recommendedMovies({ id })
  similar.value = data.results?.slice(0, 6) || []
}

const loadMovieDetails = async (id: string) => {
  movie.value = await getContent({ id }) as Movie
  if (movie.value) {
    await loadRecommendedMovies(id)
  }
}
const truncatedOverview = computed(() => {
  const maxLength = isSmallScreen.value ? 100 : 500
  if (movie.value && movie.value.overview.length > maxLength) {
    return movie.value.overview.substring(0, maxLength) + '...'
  }
  return movie.value?.overview || ''
})

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640
}

window.addEventListener('resize', updateScreenSize)

onMounted(async () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  await loadMovieDetails(id)
  updateScreenSize()
})
</script>

<template>
  <div class="absolute top-8 left-8  text-white cursor-pointer z-30 flex items-center justify-center gap-2">
  <ArrowLeftIcon class="w-8 h-8" @click="$router.back()" />
  <Home class="w-8 h-8" @click="$router.push('/')" />
  </div>
  <main v-if="movie" class="min-h-screen bg-zinc-900">
    <div class="relative h-[70vh]">
      <img
          :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
          :alt="movie.title"
          class="w-full h-full object-cover brightness-75 rounded-lg"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

      <div class="absolute bottom-0 left-0 p-8 w-full">
        <div class="max-w-4xl space-y-4">
          <h1 class="text-4xl md:text-6xl font-bold text-white">{{ movie.title }}</h1>

          <div class="flex items-center gap-4 text-gray-200">
            <div class="flex items-center">
              <Star class="w-5 h-5 text-yellow-400 mr-1" />
              <span>{{ movie.vote_average.toFixed(1) }}</span>
            </div>
            <span>•</span>
            <span>{{ movie.runtime }}min</span>
            <span>•</span>
            <span>{{ formatDate(movie.release_date) }}</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
                v-for="genre in movie.genres"
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

    <section class="p-8">
      <h2 class="text-2xl font-bold text-white mb-4">Production</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
            v-for="company in movie.production_companies"
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
      <h2 class="text-2xl font-bold text-white mb-4">Films Similaires</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        <RouterLink :to="`/movie/${film.id}`" v-for="film in similar":key="film.id">
        <div

            class="aspect-[2/3] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
        >

          <img
              :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`"
              :alt="film.title"
              class="w-full h-full object-cover"
          />

        </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>