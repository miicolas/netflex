<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl">Pour vous</h1>
       <RouterLink to="/search">
        <Search class="w-6 h-6 font-bold text-white" :stroke-width="3"/>
       </RouterLink>
    </div>
</template>
