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
button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.primary {
  background-color: #e50914;
  color: white;
  box-shadow: 0 4px 6px rgba(229, 9, 20, 0.2);
}

.primary:hover {
  background-color: #f40612;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(229, 9, 20, 0.3);
}

.primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(229, 9, 20, 0.2);
}

.secondary {
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
}

.secondary:hover {
  background-color: rgba(109, 109, 110, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.secondary:active {
  transform: translateY(0);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  button {
    width: 100%;
    padding: 0.875rem 1rem;
  }
}
</style>
