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
  <div class="user-form-info">Register</div>

  <div class="user-form">
    <div class="user-input-container">
      <label for="email">Email</label>
      <input type="email" placeholder="Email" v-model="email" />
    </div>
    <div class="user-input-container">
      <label for="password">Password</label>
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div class="user-buttons">
      <button @click="register" class="user-button">Register</button>
      <button @click="registerWithGoogle" class="user-button">Register with Google</button>
    </div>
    <div><RouterLink to="/login">Already have an account?</RouterLink></div>
  </div>
</template>
