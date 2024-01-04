<script setup>
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ref } from 'vue'
const recipes = ref([])
const db = useFirestore()
const recipesCollection = collection(db, 'recipes')
const q = query(recipesCollection, where('isReported', '==', true))

const refreshRecipes = async () => {
  const querySnap = await getDocs(q)
  recipes.value = []
  for (const doc of querySnap.docs) {
    const docData = doc.data()
        recipes.value.push({
      recipeId: doc.id,
      recipeName: docData.recipeName,
      recipeText: docData.recipeText,
      timeCreated: docData.timeCreated,
      userId: docData.userId
    })
  }
}

refreshRecipes()

const deleteRecipe = async (id) => {
  if (confirm('Are you sure you want to delete this recipe?')) {
    await deleteDoc(doc(recipesCollection, id))
  }
}

const removeReportFlag = async (id) => {
  if (confirm('Are you sure you want to remove the report flag?')) {
    await updateDoc(doc(recipesCollection, id), {
      isReported: false
    })
    refreshRecipes()
  }
}
</script>

<template>
  <table>
    <tr>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>User Id</th>
      <th>Actions</th>
    </tr>
    <tr v-for="recipe in recipes" :key="recipe.id">
      <td>{{ recipe.recipeName }}</td>
      <td>{{ recipe.recipeText }}</td>
      <td>{{ recipe.timeCreated }}</td>
      <td>{{ recipe.userId }}</td>
      <td>
        <button @click="deleteRecipe(recipe.recipeId)">Delete</button>
        <button @click="removeReportFlag(recipe.recipeId)">Remove</button>
      </td>
    </tr>
    <tr>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>User Id</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
