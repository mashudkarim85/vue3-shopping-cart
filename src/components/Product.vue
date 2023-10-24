<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import {cart} from '../store/cart'
const route = useRoute()
const id = route.params.id
const product = reactive({})
const comments = ref([])
onBeforeMount(() => {

    axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
            Object.assign(product, res.data)
        })


})
</script>
<template>
    <article class="mb-10">
        <h1 class="text-xl mb-2">
            {{ product.title }}
        </h1>
        <p>
            <img class="w-60" :src="product.image" alt="">
            {{ product.description }}
        </p>
        <p>
            Price: ${{ product.price }}
        </p>
        <div class="flex items-center space-x-6 mt-6">
            <button @click="cart.addItem(product)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
            <vue3-star-ratings v-model="product.rating.rate" />
        </div>
    </article>

</template>

<style></style>