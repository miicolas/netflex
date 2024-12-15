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
  position: relative;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: left;
  height: 80vh;
  isolation: isolate;
}

.background::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: -1;
}

.title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.details {
  font-size: clamp(1.25rem, 2vw, 1.875rem);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.overview {
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  max-width: 50%;
  color: #d1d1d1;
  line-height: 1.4;
  margin-bottom: 2rem;
}

.star-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.star-list span {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
}

div:last-child {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .background {
    padding: 2rem;
    height: 70vh;
  }

  .overview {
    max-width: 100%;
  }

  div:last-child {
    flex-direction: column;
    width: 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.background > * {
  animation: fadeIn 0.8s ease-out forwards;
}

.title {
  animation-delay: 0.2s;
}
.details {
  animation-delay: 0.4s;
}
.star-list {
  animation-delay: 0.6s;
}
div:last-child {
  animation-delay: 0.8s;
}
</style>
