<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
import IconSupport from '../components/icons/IconSupport.vue'
const db = useFirestore()
const recipes = useCollection(collection(db, 'recipes'))
const deleteRecipe = (id) => {
  router.push({ name: 'recipes/delete', params: { id: id } })
}
</script>
<template>
  <table>
    <tr>
      <th>User Image</th>
      <th>User Id</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>Actions</th>
    </tr>
    <tr v-for="recipe in recipes" :key="recipe.id">
      <td><IconSupport /></td>
      <td>{{ recipe.userId }}</td>
      <td>{{ recipe.recipeName }}</td>
      <td>{{ recipe.recipeText }}</td>
      <td>{{ recipe.timeCreated }}</td>
      <td>
        <button @click="deleteRecipe(recipe.id)">Delete</button>
      </td>
    </tr>
    <tr>
      <th>User Image</th>
      <th>User Id</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
