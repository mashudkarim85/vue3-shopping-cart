<script setup>
import { ref, reactive, onBeforeMount, computed, watch, watchEffect } from 'vue'
import axios from 'axios'
import { cart } from '../store/cart'

import ProductCardSkeleton from './ProductCardSkeleton.vue'
import { authStore } from '../store/store'

let filteredProducts = ref([]) // Initialize a filtered list
let currentPage = ref(1) // Initialize the current page
const itemsPerPage = 8 // Set the number of items per page
let sortBy = 'name' // Set the default sorting key
let sortDirection = ref('asc') // Set the default sorting direction
let filter = ref('')

const products = ref([])
function getSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-')
}
onBeforeMount(() => {
    axios.get('https://fakestoreapi.com/products')
        .then(res => {
            products.value = res.data;
            filteredProducts.value = [...res.data].slice(0, itemsPerPage);
        })
    })


    function sortProducts(key) {
        if (sortBy === key) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortBy = key;
            sortDirection.value = 'asc';
        }
        filteredProducts.value.sort((a, b) => {
            const modifier = sortDirection.value === 'asc' ? 1 : -1;
            
            if (a[key] < b[key]) return -1 * modifier;
            if (a[key] > b[key]) return 1 * modifier;
            return 0;
         });
    }


    watch(filter, (newFilter) => {
        if(newFilter) {
            filteredProducts.value =  filteredProducts.value.filter(item => {
            return item.title.toLowerCase().indexOf(newFilter.toLowerCase()) > -1
            })
        } else {
            filteredProducts.value = products.value
        }
    });

    // Computed property to calculate the total number of pages
    const totalPages = computed(() => {
      return Math.ceil(products.value.length / itemsPerPage);
    })

    watch(currentPage, () => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.value = products.value.slice(start, end);
    })

</script>
<template>
    <ProductCardSkeleton v-if="products.length < 1"/>
    <div class="bg-white" v-if="products.length > 0">
        <div class="mx-auto px-12 py-8 ">
             <div class="flex flex-col">
                <div class="flex flex-row items-center justify-between">
                    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

                    <div class="flex space-x-6">
                         <!-- Filter products -->
                        <input type="text" v-model="filter" placeholder="Filter by name" />
                        
                        <!-- Sort products -->
                        <button class="bg-gray-200 p-2 hover:bg-gray-400" @click="sortProducts('title')">Sort by Name</button>
                        <button class="bg-gray-200 p-2 hover:bg-gray-400" @click="sortProducts('price')">Sort by Price</button>
                    </div>
                </div>
                
                <!-- Product list -->
                <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-20">
                    <div v-for="product in filteredProducts" :key="product.id" class="group relative">
                        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <router-link  :to="'/products/' + product.id ">
                                <img :src="product.image" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </router-link>
                            
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-sm text-gray-700">
                                    <router-link :to="'/products/' + product.id ">
                                        {{ product.title }}
                                    </router-link>
                                </h3>

                            </div>
                            <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
                        </div>
                        <div class="flex justify-between items-center">
                            <button @click="cart.addItem(product)" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded">
                                Add To Cart
                            </button>
                            <vue3-star-ratings v-model="product.rating.rate" />

                        </div>
                    </div>
                </div>
                
                <!-- Pagination -->
                <div class="flex justify-end items-center space-x-3 mt-6    ">
                    <button class="bg-blue-400 text-white py-1 px-2 rounded" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
                    <span>{{ currentPage }} / {{ totalPages }}</span>
                    <button class="bg-blue-400 text-white py-1 px-2 rounded" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<style></style>