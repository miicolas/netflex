<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {ArrowLeftIcon, Home} from 'lucide-vue-next'
import {getContent, recommendedMovies} from '../lib/api/content'
import type {MediaContent} from '../lib/type.ts'
import SimilarContent from "../components/_details/similar-content.vue";
import ProductionContent from "../components/_details/production-content.vue";
import TVContent from "../components/_details/tv-content.vue";
import HeroContent from "../components/_details/hero-content.vue";

const route = useRoute()
const media = ref<MediaContent | null>(null)
const similar = ref<any[]>([])
const isSmallScreen = ref(window.innerWidth < 640)

const isTV = computed(() => route.params.type === 'tv')

watch(route, () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  media.value = null
  similar.value = []
  loadMediaDetails(id as string)
})

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 640
}

const loadRecommendedMedia = async (id: string) => {
  const mediaType = isTV.value ? 'tv' : 'movie'
  console.log(isTV.value, 'isTV')
  const data = await recommendedMovies({id, media_type: mediaType})
  similar.value = data.results?.slice(0, 6) || []
}

const loadMediaDetails = async (id: string) => {
  const mediaType = isTV.value ? 'tv' : 'movie'
  media.value = await getContent({id, media_type: mediaType}) as MediaContent
  if (media.value) {
    await loadRecommendedMedia(id)
  }
}

onMounted(async () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  await loadMediaDetails(id as string)
  updateScreenSize()
})

window.addEventListener('resize', updateScreenSize)
</script>

<template>
  <div class="absolute top-8 left-8 text-white cursor-pointer z-30 flex items-center justify-center gap-2">
    <button
        @click="$router.back()"
        class="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-full transition-colors z-50"
    >
      <ArrowLeftIcon class="w-6 h-6" />
    </button>
    <button
        @click="$router.push('/')"
        class="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-full transition-colors z-50"
    >
      <Home class="w-6 h-6" />
    </button>
  </div>
  <main v-if="media" class="min-h-screen bg-zinc-900">


    <HeroContent :media="media" :isTV="isTV" :SmallScreen="isSmallScreen"/>
    <TVContent :media="media" :isTV="isTV"/>
    <ProductionContent :media="media"/>
    <SimilarContent :similar="similar" :isTV="isTV"/>
  </main>
</template>