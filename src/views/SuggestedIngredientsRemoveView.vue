<script setup>
import { useFirestore } from 'vuefire'
import { collection, getDoc, doc, deleteDoc } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import router from '../router'

const db = useFirestore()
const ingredientId = ref(null)
const ingredient = ref(null)
const name = ref('')
const unit = ref('')

const fetchIngredient = async () => {
  try {
    const id = router.currentRoute.value.params.id
    ingredientId.value = id

    const ingredientsCollection = collection(db, 'suggested-ingredients');
    const ingredientDoc = doc(ingredientsCollection, id);

    const docSnapshot = await getDoc(ingredientDoc);

    if (docSnapshot.exists()) {
      ingredient.value = docSnapshot.data();
      name.value = ingredient.value.name;
      unit.value = ingredient.value.unit;
    } else {
      console.error('Ingredient not found');
    }
  } catch (error) {
    console.error('Error fetching ingredient:', error);
  }
};

const removeIngredientSuggestion = async () => {
    try {
        const ingredientsCollection = collection(db, 'suggested-ingredients');
        const ingredientDoc = doc(ingredientsCollection, ingredientId.value);
        await deleteDoc(ingredientDoc);
    } catch (error) {
        console.error("Error updating ingredient:", error);
    }
    router.go(-1)
}

onMounted(() => {
  fetchIngredient()
})
</script>

<template>
  <div>
    <div>
        <text>Do you really want to delete this ingredient?</text>
    </div>
    <div>
      <text>Ingredient Name:</text>
    </div>
    <div>
        {{ name }}
    </div>
    <div>
      <text>Ingredient Unit:</text>
    </div>
    <div>
        {{ unit }}
    </div>
    <button @click="removeIngredientSuggestion">Remove</button>
  </div>
</template>