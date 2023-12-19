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
  <div class="user-form-info">Login</div>

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
      <button @click="login" class="user-button">Login</button>
      <button @click="loginWithGoogle" class="user-button">Login with Google</button>
    </div>
    <div><RouterLink to="/register">Does not have an account?</RouterLink></div>
  </div>
</template>

<style>
.user-form-info {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.user-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-input-container input {
  width: 300px;
  height: 30px;
}

.user-button {
  height: 30px;
  width: 300px;
  text-align: center;
}

.user-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>