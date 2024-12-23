<script setup lang="ts">
import HeaderNavbar from "../components/header-navbar.vue";
import MainShowcase from "../components/main-showcase.vue";
import { ref, onMounted } from 'vue';
import { getTrending } from "../lib/api/content.ts";
import TrendingAll from "../components/trending-all.vue";


const mainShowcase = ref(null);
const trending = ref(null);

onMounted(async () => {
  const data = await getTrending();
  mainShowcase.value = data.results[0];
  trending.value = data.results.slice(1);
});
</script>

<template>

    <div class="relative">
      <div class="absolute top-0 left-0 w-full z-20 p-4">
        <HeaderNavbar/>
      </div>
      <MainShowcase v-if="trending" :trending="mainShowcase "/>
      <div v-else>Loading...</div>
      <TrendingAll v-if="trending" :trending="trending "/>
    </div>


</template>