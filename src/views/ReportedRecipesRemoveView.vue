<script setup>
import { useFirestore } from 'vuefire'
import { collection, doc, getDoc, where, query, getDocs, deleteDoc } from 'firebase/firestore'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex';
import router from '../router'

const store = useStore();
const db = useFirestore()
const recipeId = ref(null)
const recipe = ref(null)
const name = ref('')

const fetchRecipe = async () => {
  try {
    const id = router.currentRoute.value.params.id
    recipeId.value = id

    const recipesCollection = collection(db, 'recipes');
    const document1 = doc(recipesCollection, id);

    const docSnapshot1 = await getDoc(document1);

    if (docSnapshot1.exists()) {
      recipe.value = docSnapshot1.data();
      name.value = recipe.value.recipeName;
    } else {
      console.error('Recipe not found');
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
};

const removeRecipeReport = async () => {
    if (recipeId.value !== null) {
        try {
            const reportedRecipesCollection = collection(db, 'reported-recipes');
            const q = query(reportedRecipesCollection, where('recipeId', '==', recipeId.value));
            const querySnap = await getDocs(q);

            console.log('Query Snapshot:', querySnap.docs.map(doc => doc.id));

            // Use Promise.all to wait for all delete operations to complete
            await Promise.all(querySnap.docs.map(async (doc) => {
                const docRef = doc.ref;
                await deleteDoc(docRef);
                console.log('Deleting:', docRef.path);
            }));

            // After all delete operations are complete, update the state
            store.commit('setDataLoaded', false);
            console.log("setted as false");

            // Log the current route path and try navigating back
            console.log('Current Route Path:', router.currentRoute.value.path);
            router.go(-1);
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    } else {
        console.warn("RecipeId is null. Cannot remove recipe report.");
    }
}

onMounted(() => {
  console.log("im mounted")
  fetchRecipe()
  console.log("im fetched");
});

onBeforeUnmount(async () => {
  // Add a delay to ensure that asynchronous operations complete before unmounting
  await new Promise(resolve => setTimeout(resolve, 100));
});
</script>

<template>
  <div>
    <div>
        <text>Do you really want to remove this suggestion?</text>
    </div>
    <div>
      <text>Recipe Name:</text>
    </div>
    <div>
        {{ name }}
    </div>
    <button @click="removeRecipeReport">Remove</button>
  </div>
</template>