import { createRouter, createWebHistory } from 'vue-router'
import Products from '../components/Products.vue'
import Product from '../components/Product.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import {authStore} from '../store/store'
import Cart from '../components/Cart.vue'
import Checkout from '../components/Checkout.vue'


const routes = [
    {
        path: '/', name: "Products", component: Products
    },
    {
        path: '/login', name: "Login", component: Login
    },
    {
        path: '/register', name: "Register", component: Register
    },
    {
        path: '/cart', name: "Cart", component: Cart
    },
    {
        path: '/checkout', name: "Checkout", component: Checkout
    },
    {
        path: '/products/:id', name: "products", component: Product
    }
   
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next('/login')
    }else{
        next()
    }
})

export default router
