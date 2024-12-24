<script setup lang="ts">
import { ArrowLeftIcon } from "lucide-vue-next";
import { ref } from "vue";
import CardView from "../components/card-view.vue";
import { searchContent } from "../lib/api/content";
import type { SearchItem } from "../lib/type.ts";

const query = ref('');
const results = ref([ <SearchItem>{} ]);



const search = async () => {
  const data = await searchContent(query.value);
  results.value = data.results;
}

console.log(results.value, 'results')
</script>

<template>
  <div class="min-h-screen bg-[#141414] text-gray-100 p-6">
    <button
        @click="$router.back()"
        class="fixed top-8 left-8 p-2 hover:bg-gray-800/50 rounded-full transition-colors z-50"
    >
      <ArrowLeftIcon class="w-6 h-6" />
    </button>

    <div class="max-w-7xl mx-auto mt-16 space-y-8">
      <div class="relative z-10">
        <input
            type="text"
            v-model="query"
            @input="search"
            placeholder="Titres, personnes, genres"
            class="w-full px-6 py-4 text-lg bg-[#2b2b2b] border-2 border-transparent rounded-lg
                 placeholder-gray-400 focus:bg-[#333333] focus:border-gray-400
                 transition-all duration-300 outline-none"
        >
      </div>

      <div class="space-y-8" v-if="results.length >= 1">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="item in results"
               :key="item.id"
               class="group relative transition-transform duration-300 hover:scale-110 hover:z-10">
            <CardView :id="item.id" :name="item.title || item.name" :poster_path="item.poster_path" :media_type="item.media_type"/>
          </div>
        </div>
      </div>

      <div v-else class="flex items-center justify-center h-64 text-gray-400">
        Aucun résultat trouvé
      </div>
    </div>
  </div>
</template>