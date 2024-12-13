<script setup>
import Button from "@/components/buttons.vue";
import { Star } from "lucide-vue-next";

const { top1 } = defineProps(["top1"]);

const calculatePopularity = (top1) => {
  top1.vote_average = (top1.vote_average / 10) * 5;
  return top1.vote_average;
};
calculatePopularity(top1);
</script>

<template v-if="top1">
  <section
    class="background"
    :style="{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${top1.backdrop_path})`,
    }"
  >
    <h1 class="title">{{ top1.title }}</h1>
    <div class="details">
      <p>{{ new Date(top1.release_date).getFullYear() }}</p>

      <p class="overview">
        {{ top1.overview }}
      </p>
    </div>
    <div class="star-list">
      <div
        v-for="index in Math.round(Math.round(top1.vote_average))"
        :key="index"
      >
        <Star size="24" fill="yellow" />
      </div>
      <div
        v-for="index in Math.floor(5 - Math.round(top1.vote_average))"
        :key="index"
      >
        <Star size="24" />
      </div>
      <span>{{ top1.vote_average }}</span>
    </div>
    <div>
      <Button type="primary">En savoir plus</Button>
      <Button type="secondary"> Ajouter à la liste</Button>
    </div>
  </section>
</template>

<style scoped>
.background {
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  text-align: left;
  height: 75vh;
}

.title {
  font-size: 4rem;
  font-weight: 800;
}

.details {
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.overview {
  font-size: 1.5rem;
  max-width: 50%;
  color: #a7a6a6;
}

.star-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
