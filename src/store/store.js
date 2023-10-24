import { ref, reactive } from 'vue'
import router from '../router/router'
import {cart} from './cart'

const authStore = reactive({
    isAuthenticated: localStorage.getItem('auth') == 1,
    user: JSON.parse(localStorage.getItem('user')),
    authenticate(username, password) {
        fetch(`http://localhost:3001/users?username=${username}&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                if (res.length > 0) {
                    authStore.isAuthenticated = true
                    authStore.user = res[0]
                    res[0].token = "eyJhbGciOiJIUzI1NiIsInR";
                    localStorage.setItem('auth', 1)
                    localStorage.setItem('user', JSON.stringify(res[0]))
                    router.push('/cart')
                } else {
                    alert('Login failed. Invalid username or password.');
                }
            })
    },
    register(username, password) {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: username, username, password })
        }).then(res => res.json())
            .then(res => {
                if (res.error == 0) {
                    router.push('/login')
                }
            })
    },
    logout() {
        authStore.isAuthenticated = false
        authStore.user = {}
        localStorage.setItem('auth', 0)
        localStorage.setItem('user', '{}')
        cart.items ={}
        // cart.totalPrice = 0
        cart.saveCartInLocalStorage()
        router.push('/login')
    },
    getUserToken(){
        return authStore.user.email
    }
})

export { authStore }