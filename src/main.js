import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import vue3StarRatings from "vue3-star-ratings";

createApp(App).use(router).component("vue3-star-ratings", vue3StarRatings).mount('#app')

