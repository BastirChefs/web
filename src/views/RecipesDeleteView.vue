<script setup>
import { useFirestore } from 'vuefire'
import { collection, getDoc, doc, deleteDoc, query, where, getDocs } from 'firebase/firestore'
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
        removeRecipeReport();
        const recipesCollection = collection(db, 'recipes');
        const recipesDoc = doc(recipesCollection, recipeId.value);
        await deleteDoc(recipesDoc);
    } catch (error) {
        console.error("Error updating ingredient:", error);
    }
    router.go(-1)
}

const removeRecipeReport = async () => {
    if (recipeId.value !== null) {
        try {
            const reportedRecipesCollection = collection(db, 'reported-recipes');
            const q = query(reportedRecipesCollection, where('recipeId', '==', recipeId.value));
            const querySnap = await getDocs(q);

            if(querySnap.docs === null){
                return;
            }

            console.log('Query Snapshot:', querySnap.docs.map(doc => doc.id));

            querySnap.forEach(async (doc) => {
                const docRef = doc.ref;
                await deleteDoc(docRef);
                console.log('Deleting:', docRef.path);
            });
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    } else {
        console.warn("RecipeId is null. Cannot remove recipe report.");
    }
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