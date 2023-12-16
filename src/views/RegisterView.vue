<script setup>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const provider = new GoogleAuthProvider()
import { ref } from 'vue'
import router from '../router'
const email = ref('')
const password = ref('')
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
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

const registerWithGoogle = () => {
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
    <h1>This is a register page</h1>
  </div>
  <label for="email">Email</label>
  <input type="email" placeholder="Email" v-model="email" />
  <label for="password">Password</label>
  <input type="password" placeholder="Password" v-model="password" />
  <button @click="register">Register</button>
  <button @click="registerWithGoogle">Sign in with Google</button>
  <RouterLink to="/login">Login</RouterLink>
</template>
