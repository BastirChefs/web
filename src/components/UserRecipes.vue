<script setup>
import { useFirestore } from 'vuefire'
import { collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
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
  
  querySnap.forEach(async (recipe) => {
    const userId = recipe.data().userId
    const user = await getDoc(doc(db, 'users', userId))
    const docData = recipe.data()
    const object = {
      id: recipe.id,
      userId: docData.userId,
      recipeName: docData.recipeName,
      recipeText: docData.recipeText,
      timeCreated: docData.timeCreated,
      recipeImage: docData.image
    }
    const userData = user.data()
    if(userData !== undefined){
      object.userImage = userData.userImage
      object.username = userData.username
    }
    
    recipes.value.push(object)
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
      <th>User Name</th>
      <th>Recipe Image</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>Actions</th>
    </tr>
    <tr v-for="recipe in recipes" :key="recipe.id">
      <td><img :src="recipe.userImage" alt="User Image" width="100" height="100"></td>
      <td>{{ recipe.username }}</td>
      <td><img :src="recipe.recipeImage" alt="Recipe Image" width="100" height="100"></td>
      <td>{{ recipe.recipeName }}</td>
      <td><div style="height:100px; overflow:auto">{{ recipe.recipeText }}</div></td>
      <td>{{ recipe.timeCreated }}</td>
      <td>
        <button @click="deleteRecipe(recipe.id)">Delete</button>
      </td>
    </tr>
    <tr>
      <th>User Image</th>
      <th>User Name</th>
      <th>Recipe Image</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
