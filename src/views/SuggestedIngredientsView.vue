<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
const db = useFirestore()
const ingredients = useCollection(collection(db, 'suggested-ingredients'))
const addIngredient = (id) => {
    router.push({name: 'suggestedIngredients/add', params: {id: id}})
}
const removeSuggestion = (id) => {
    router.push({name: 'suggestedIngredients/remove', params: {id: id}})
}
</script>
<template>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
        <div>
            {{ ingredient.name }}
        </div>
        <div>
            {{ ingredient.unit }}
        </div>
        <button @click="addIngredient(ingredient.id)">
            Add
        </button>
        <button @click="removeSuggestion(ingredient.id)">
            Remove
        </button>
      
    </li>
  </ul>
</template>
