<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
const db = useFirestore()
const ingredients = useCollection(collection(db, 'suggested-ingredients'))
const addIngredient = (id) => {
  router.push({ name: 'suggestedIngredients/add', params: { id: id } })
}
const removeSuggestion = (id) => {
  router.push({ name: 'suggestedIngredients/remove', params: { id: id } })
}
</script>
<template>
  <table>
    <tr>
      <th>Ingredient Name</th>
      <th>Unit</th>
      <th>Actions</th>
    </tr>
    <tr v-for="ingredient in ingredients" :key="ingredient.id">
      <td>{{ ingredient.name }}</td>
      <td>{{ ingredient.unit }}</td>
      <td>
        <button @click="addIngredient(ingredient.id)">Add</button>
        <button @click="removeSuggestion(ingredient.id)">Remove</button>
      </td>
    </tr>
    <tr>
      <th>Ingredient Name</th>
      <th>Unit</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
