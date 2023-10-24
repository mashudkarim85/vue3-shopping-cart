<script setup>
import { authStore } from './store/store';
import {cart} from './store/cart'
const auth = authStore
</script>

<template>
    <header class="bg-blue-700 border-b-light-100 border-b h-20 text-white items-center flex p-5 text-2xl sticky top-0 z-10">
    <section class="flex justify-between w-full">
      <router-link to="/">eShop</router-link>
      <p class="space-x-6">
        <router-link to="/">Home </router-link>
        <router-link to="/cart">Cart({{ cart.totalCartItems }}) </router-link>
        <button v-if="auth.isAuthenticated" @click="auth.logout()" class="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded">
          <span>Logout</span>
        </button>
      </p>
    </section>
  </header>
  <section class="flex relative">
    <main class="w-full p-5">
      <router-view></router-view>
    </main>
  </section>
</template>

<style scoped></style>
