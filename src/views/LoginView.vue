<script setup>
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { ref } from 'vue'
import router from '../router'
const provider = new GoogleAuthProvider()
const email = ref('')
const password = ref('')
const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Success')
      console.log(data)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}

const loginWithGoogle = () => {
  signInWithPopup(getAuth(), provider)
    .then((data) => {
      console.log('Success')
      console.log(data)
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>
<template>
  <div class="login">
    <h1>This is a login page</h1>
  </div>
  <label for="email">Email</label>
  <input type="email" placeholder="Email" v-model="email" />
  <label for="password">Password</label>
  <input type="password" placeholder="Password" v-model="password" />
  <button @click="login">Log In</button>
  <button @click="loginWithGoogle">Log in with Google</button>
  <RouterLink to="/register">Register</RouterLink>
</template>
