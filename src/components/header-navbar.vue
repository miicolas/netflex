<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-bold text-xl">Pour vous</h1>
       <RouterLink to="/search">
        <Search/>
       </RouterLink>
    </div>
</template>
