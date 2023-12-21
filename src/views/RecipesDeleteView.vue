<script setup>
import { useFirestore } from 'vuefire'
import { collection, getDoc, doc, deleteDoc } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import router from '../router'

const db = useFirestore()
const recipeId = ref(null)
const recipe = ref(null)
const name = ref('')

const fetchRecipe = async () => {
  try {
    const id = router.currentRoute.value.params.id
    recipeId.value = id

    const recipesCollection = collection(db, 'recipes');
    const recipeDoc = doc(recipesCollection, id);

    const docSnapshot = await getDoc(recipeDoc);

    if (docSnapshot.exists()) {
      recipe.value = docSnapshot.data();
      name.value = recipe.value.recipeName;
    } else {
      console.error('Recipe not found');
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
};

const deleteRecipe = async () => {
    try {
        const recipesCollection = collection(db, 'recipes');
        const recipesDoc = doc(recipesCollection, recipeId.value);
        await deleteDoc(recipesDoc);
    } catch (error) {
        console.error("Error updating ingredient:", error);
    }
    router.go(-1)
}

onMounted(() => {
  fetchRecipe()
})
</script>

<template>
  <div>
    <div>
        <text>Do you really want to delete this recipe?</text>
    </div>
    <div>
      <text>Recipe Name:</text>
    </div>
    <div>
        {{ name }}
    </div>
    <button @click="deleteRecipe">Delete</button>
  </div>
</template>