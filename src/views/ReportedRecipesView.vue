<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, getDoc } from 'firebase/firestore'
import router from '../router'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
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
  store.commit('setDataLoaded', true);
  console.log("set but true")
}

watchEffect(() => {
    store.state.dataLoaded = false;
})

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log("hello there")
  if (!store.state.dataLoaded) {
    refreshData();
    console.log("mmm refress")
  }
});

onUnmounted(() => {
    store.commit('setDataLoaded', false);
});
</script>

<template>
    <table>
    <tr>
      <th>Recipe Name</th>
      <th>Actions</th>
    </tr>
    <tr v-for="recipe in recipesWithNames" :key="recipe.id">
      <td>{{ recipe.recipeName }}</td>
      <td>
        <button @click="deleteRecipe(recipe.recipeId)">
            Delete
        </button>
        <button @click="removeSuggestion(recipe.recipeId)">
            Remove
        </button>
      </td>
    </tr>
    <tr>
      <th>Recipe Name</th>
      <th>Actions</th>
    </tr>
  </table>
</template>