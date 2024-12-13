<script setup>
const props = defineProps(["type", "class"]);
import { computed } from "vue";

const styleClasses = {
  primary: "primary",
  secondary: "secondary",
};

const styleComputed = computed(() => styleClasses[props.type] || "");
</script>

<template>
  <button :class="styleComputed" :style="props.class">
    <slot />
  </button>
</template>

<style scoped>
.primary {
  background-color: blue;
  color: #fff;
}

.secondary {
  background-color: #00f;
  color: #fff;
}
</style>
