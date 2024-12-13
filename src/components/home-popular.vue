<script setup>
const { top1 } = defineProps(["top1"]);

console.log(top1, "props");
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
    <p>Note : 5</p>
    <div>
      <button>Regarder</button>
      <button>Tous les épisodes</button>
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
</style>
