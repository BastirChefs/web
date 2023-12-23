<script setup>
import { useFirestore } from 'vuefire'
import { collection, doc, getDoc, where, query, getDocs, deleteDoc } from 'firebase/firestore'
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

            querySnap.forEach(async (doc) => {
                const docRef = doc.ref;
                await deleteDoc(docRef);
                console.log('Deleting:', docRef.path);
            });
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
        router.push({name: 'reportedRecipes'})
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