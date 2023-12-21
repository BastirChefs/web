<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
import Navbar from '../components/Navbar.vue';
const db = useFirestore()
const recipes = useCollection(collection(db, 'recipes'))
const deleteRecipe = (id) => {
    router.push({name: 'recipes/delete', params: {id: id}})
}
</script>
<template>
  <Navbar/>
  <ul>
    <li v-for="recipe in recipes" :key="recipe.id">
        <div>
            {{ recipe.recipeName }}
        </div>
        <button @click="deleteRecipe(recipe.id)">
            Delete
        </button>
    </li>
  </ul>
</template>
