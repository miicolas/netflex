import { createRouter, createWebHistory } from 'vue-router';
import Home from '../routes/Home.vue';
import Search from '../routes/Search.vue';
import Movie from '../routes/Details.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/details/:id/:type', component: Movie },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;