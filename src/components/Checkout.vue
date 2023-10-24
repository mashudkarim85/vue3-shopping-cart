<script setup>
import { reactive, ref, onBeforeMount } from 'vue'  
import MultiStepForm from './MultiStepForm.vue'
import { order } from '../store/order'
import { authStore } from '../store/store'
import { toCurrency } from '../shared/utils'

let steps = [
    {'step_no':1 },
    {'step_no':2 },
    {'step_no':3 }
];

let disabledPayment= ref(false);
const shipInfo = reactive({
    address: '',
    area: '',
    city: '',
    postalCode: '',
    paymentMethod: ''
})

function makePayment() {
    disabledPayment.value = true
    alert('Thanks for your pay ment')
}

</script>


<template>
    <MultiStepForm :steps="steps">
        <template #step1>
            <div class="flex flex-col justify-center mx-auto max-w-lg">
                <h2 class="mb-2">Shipping Information</h2>
                <span class="h-1 w-full bg-red-600 lg:w-1/4"></span>
                <div class="bordered border-solid shadow-lg mt-6 p-6 ">
                    <div class="flex flex-col mb-3">
                        <label>Address<span class="text-red-800">*</span></label>
                        <input type="text" name="address" v-model="shipInfo.address" required>
                    </div>

                    <div class="flex flex-col mb-3">
                        <label>Area/Thana<span class="text-red-800">*</span></label>
                        <input type="text" name="area" v-model="shipInfo.area" required>
                    </div>
                    <div class="flex flex-col mb-3">
                        <label>City<span class="text-red-800">*</span></label>
                        <input type="text" name="City" v-model="shipInfo.city" required>
                    </div>
                    <div class="flex flex-col mb-3">
                        <label>Postal Code</label>
                        <input type="text" name="postalCode" v-model="shipInfo.postalCode">
                    </div>
                </div>
            </div>
        </template>
        <template #step2>
            <div class="flex flex-col  justify-center mx-auto max-w-lg">
                <h2 class="mb-2">Payment Information</h2>
                <span class="h-1 w-full bg-red-600 lg:w-1/4"></span>
                <div class="bordered border-solid shadow-lg mt-6 p-6 ">
                    <div class="flex flex-col mb-3 space-y-3">
                        <label>Select Payment Method</label>
                        <p><input class="mr-3" type="radio" value="cash" name="group1" v-model="shipInfo.paymentMethod">Cash on delivery</p>
                        <p><input class="mr-3" type="radio" value="online" name="group1" v-model="shipInfo.paymentMethod">Online Payment</p>
                    </div>

                    <div class="flex flex-col py-3" v-if="shipInfo.paymentMethod=='online'">
                        <div class="text-center">
                            <button @click.prevent="makePayment" class="bg-green-800 text-white px-3 rounded py-1 disabled:bg-gray-200 disabled:text-slate-500" :disabled="disabledPayment" type="button">Make Payment</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </template>
        <template #step3>
            <div class="flex flex-col  justify-center mx-auto max-w-lg">
                <h2 class="mb-2 text-green-600">Thanks! Your order successfully submitted</h2>
                <span class="h-1 w-full bg-red-600 lg:w-1/4"></span>
                <div class="bordered border-solid shadow-lg mt-6 p-6 ">
                    <div class="my-2" v-for="s_order in order.orders" :key="s_order.id">
                        <div class="order-info flex justify-between w-full">
                            <p class="w-1/3"><strong>Order ID:</strong> {{ s_order.id }}</p>
                            <p class="w-1/3"><strong>Total Amount:</strong> ${{ s_order.totalAmount }}</p>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MultiStepForm>
</template>