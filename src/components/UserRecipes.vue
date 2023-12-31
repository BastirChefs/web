<script setup>
import { useCollection, useDocument, useFirestore } from 'vuefire'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import IconSupport from './icons/IconSupport.vue'
import { ref } from 'vue'
const db = useFirestore()
const router = useRouter()
const deleteRecipe = (id) => {
  router.push({ name: 'recipes/delete', params: { id: id } })
}
console.log('hello there')
const recipes = ref([])

const id = router.currentRoute.value.params.id
const recipesCollection = collection(db, 'recipes')
let q = null
if (id !== '') {
  q = query(recipesCollection, where('userId', '==', id))
} else {
  q = query(recipesCollection)
}
const querySnap = await getDocs(q)
querySnap.docs.map((doc) => doc.id)
querySnap.forEach(async (doc) => {
  recipes.value.push(doc.data())
})
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
