<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
import Navbar from '../components/Navbar.vue';
const db = useFirestore()
const ingredients = useCollection(collection(db, 'ingredients'))
const editIngredient = (id) => {
    router.push({name: 'ingredients/edit', params: {id: id}})
}
const deleteIngredient = (id) => {
    router.push({name: 'ingredients/delete', params: {id: id}})
}
</script>
<template>
  <Navbar/>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
        <div>
            {{ ingredient.name }}
        </div>
        <button @click="editIngredient(ingredient.id)">
            Edit
        </button>
        <button @click="deleteIngredient(ingredient.id)">
            Delete
        </button>
      
    </li>
  </ul>
</template>
