<script setup lang="ts">
import { defineProps } from 'vue';
import CardView from "./card-view.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";

type MediaType = 'tv' | 'movie';

const props = defineProps<{
  items: { id: number; name: string; poster_path: string; media_type: MediaType }[];
}>();

const prev = () => {
  const container = document.querySelector('.carousel-container') as HTMLElement;
  if (container) {
    container.scrollBy({
      left: -285,
      behavior: 'smooth',
    });
  }
};

const next = () => {
  const container = document.querySelector('.carousel-container') as HTMLElement;
  if (container) {
    container.scrollBy({
      left: 285,
      behavior: 'smooth',
    });
  }
};
</script>

<template>
  <div class="carousel flex items-center">
    <button @click="prev" class="mr-2 hidden md:block"> <ChevronLeftIcon class="w-6 h-6"/></button>
    <div class="carousel-container flex overflow-x-auto snap-x snap-mandatory">
      <div class="carousel-item flex-none snap-left text-center mr-4" v-for="item in props.items" :key="item.id">
        <CardView :id="item.id" :name="item.name" :poster_path="item.poster_path" :media_type="item.media_type"/>
      </div>
    </div>
    <button @click="next" class="ml-2 hidden md:block"> <ChevronRightIcon class="w-6 h-6"/></button>
  </div>
</template>

<style scoped>
.carousel-container {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  scroll-snap-align: start;
}
</style>