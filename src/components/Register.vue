<script setup>
import { ref , reactive } from 'vue'
import { authStore } from '../store/store';

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
});

const register = () => {
  const { email, password, confirmPassword } = formData;

  if (password === confirmPassword) {
    authStore.register(email, password);
  } else {
    alert('Password and Confirm Password do not match');
  }
};

</script>

<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div class="bg-white p-8 rounded shadow-md w-1/3">
        <h2 class="text-2xl font-semibold mb-4 text-center uppercase">Registration</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-gray-900">Email</label>
            <input type="email" id="email" placeholder="Enter your email Address" v-model="formData.email" required class="w-full border rounded px-3 py-2">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-900">Password</label>
            <input type="password" id="password"  placeholder="Enter your password" v-model="formData.password" required class="w-full border rounded px-3 py-2">
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-900">Confirm Password</label>
            <input type="password" id="confirmPassword"  placeholder="Confirm your password" v-model="formData.confirmPassword" required class="w-full border rounded px-3 py-2">
          </div>
          <div class="flex justify-between">
            <p>
              <span class="text-gray-400">Already have an account? </span>
            <router-link :to="{ name: 'Login' }" type="button" class="px-4 py-2 rounded border hover:bg-gray-200">Log in</router-link>
            </p>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
         </div>
          
        </form>
      </div>  
    </div>    
  </template>
  