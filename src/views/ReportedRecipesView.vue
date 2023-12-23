<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, getDoc } from 'firebase/firestore'
import router from '../router'
import Navbar from '../components/Navbar.vue';
import { ref, onMounted, watchEffect } from 'vue';

const db = useFirestore()
const reportedRecipes = useCollection(collection(db, 'reported-recipes'))
const recipesWithNames = ref([]);

const getRecipeName = async (id) => {
  try {
    const recipesCollection = collection(db, 'recipes');
    const recipeDoc = doc(recipesCollection, id);

    const docSnapshot = await getDoc(recipeDoc);

    if (docSnapshot.exists()) {
      return docSnapshot.data().recipeName;
    } else {
      console.warn('Recipe not found for ID:', id);
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

const deleteRecipe = (id) => {
  router.push({name: 'recipes/delete', params: {id: id}})
}

const removeSuggestion = (id) => {
  router.push({name: 'reportedRecipes/remove', params: {id: id}})
}

const refreshData = async () => {
  recipesWithNames.value = [];
  await Promise.all(reportedRecipes.value.map(async (recipe) => {
    const recipeName = await getRecipeName(recipe.recipeId);
    if (recipeName !== null) {
      recipesWithNames.value.push({ ...recipe, recipeName });
    }
  }));
}

onMounted(() => {
  refreshData();
});

watchEffect(() => {
  refreshData();
});
</script>

<template>
  <Navbar/>
  <ul>
    <li v-for="recipe in recipesWithNames" :key="recipe.id">
        <div>
            {{ recipe.recipeName || 'Recipe Name Not Available' }}
        </div>
        <button @click="deleteRecipe(recipe.recipeId)">
            Delete
        </button>
        <button @click="removeSuggestion(recipe.recipeId)">
            Remove
        </button>
    </li>
  </ul>
</template>