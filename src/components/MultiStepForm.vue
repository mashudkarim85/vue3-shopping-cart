<script setup>
    import { ref  } from 'vue'
    import router from '../router/router'
    import { cart } from '../store/cart'
    import { order } from '../store/order'
    
    let activeStepIndex = ref(0);

    function submitStep(){
        activeStepIndex.value++;
    }

    const props = defineProps({
        steps: Array
    });

    function completeOrder() {
      cart.placeOrder()
      cart.items = {};
    }

    async function doneOrder() {
      localStorage.setItem('cart', '{}')
      for (const ord of order.orders) {
        await fetch(`http://localhost:3001/orders/${ord.id}`, { method: 'delete'});
      }
      router.push("/");
    }

  </script>

<template>
    <form @submit.prevent="submitStep">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        :id="'step'+(index+1)" 
        v-show="activeStepIndex===index"
        class="vue-form-step">
          <slot :name="'step'+(index+1)" />
       </div>
       <div class="text-center py-6" v-if="activeStepIndex < 1">
          <button class="bg-indigo-800 text-white px-3 rounded py-1 " type="submit">Next</button>
       </div>
       <div class="text-center py-6" v-if="activeStepIndex == 1">
          <button @click="completeOrder()" class="bg-indigo-800 text-white px-3 rounded py-1 " type="submit">Next</button>
       </div>
       <div class="text-center py-6"  v-if="activeStepIndex > 1">
          <button @click="doneOrder" class="bg-green-800 text-white px-3 rounded py-1 " type="button">Done</button>
       </div>
    </form>
  </template>

  