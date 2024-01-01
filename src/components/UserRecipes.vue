<script setup>
import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import IconSupport from './icons/IconSupport.vue'
import { ref } from 'vue'
const db = useFirestore()
const router = useRouter()
const recipes = ref([])
const id = router.currentRoute.value.params.id
const recipesCollection = collection(db, 'recipes')
let q = null
if (id !== '') {
  q = query(recipesCollection, where('userId', '==', id))
} else {
  q = query(recipesCollection)
}

const refreshData = async () => {
  recipes.value = []
  const querySnap = await getDocs(q)
  querySnap.forEach((doc) => {
    const docData = doc.data()
    recipes.value.push({
      id: doc.id,
      userId: docData.userId,
      recipeName: docData.recipeName,
      recipeText: docData.recipeText,
      timeCreated: docData.timeCreated
    })
  })
}

refreshData()

const deleteRecipe = async (id) =>  {
  if (confirm('Are you sure you want to delete this recipe?')) {
    await deleteDoc(doc(recipesCollection, id))
    await deleteDoc(doc(collection(db, 'reported-recipes'), id))
  }
  refreshData()
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
