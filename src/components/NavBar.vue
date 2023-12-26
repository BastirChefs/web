<template>
  <nav>
    <div class="nav-container">
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/ingredients" class="nav-item">Ingredients</RouterLink>
      <RouterLink to="/suggestedIngredients" class="nav-item">Suggested Ingredients</RouterLink>
      <RouterLink to="/recipes" class="nav-item">Recipes</RouterLink>
      <RouterLink to="/reportedRecipes" class="nav-item">Reported Recipes</RouterLink>
      <button @click="logout" class="nav-item">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { logout } from '../views/LogoutView.vue'
</script>

<style scoped>
nav {
  background-color: #cb5e11;
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
