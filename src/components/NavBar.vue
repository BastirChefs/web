<template>
    <nav>
      <div class="nav-container">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/ingredients" class="nav-item">Ingredients</RouterLink>
        <RouterLink to="/suggestedIngredients" class="nav-item">Suggested Ingredients</RouterLink>
        <RouterLink to="/recipes" class="nav-item">Recipes</RouterLink>
        <RouterLink to="/reportedRecipes" class="nav-item">Reported Recipes</RouterLink>
        <!-- Add more links as needed -->
  
        <!-- You can also include a login/logout button based on user authentication status -->
        <button v-if="isAuthenticated" @click="logout" class="nav-item">Logout</button>
        <button v-else @click="login" class="nav-item">Login</button>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, signOut } from 'firebase/auth'
  import { RouterLink } from 'vue-router';
  
  const isAuthenticated = ref(true)
  const router = useRouter()
  
  const login = () => {
    router.push('/login')
  }
  
  const logout = async () => {
    try {
      await signOut(getAuth())
      isAuthenticated.value = false
      router.push('/login')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  
  </script>
  
  <style scoped>
  nav {
    background-color: #ed831f;
    color: white;
    padding: 10px;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
  }
  
  .nav-item {
    margin-right: 10px;
    color: white;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    background-color: black;
  }
  </style>