<script setup>
import { useFirestore } from 'vuefire'
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore'
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

    const ingredientsCollection = collection(db, 'ingredients');
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

const saveChanges = async () => {
    try {
        const ingredientsCollection = collection(db, 'ingredients');
        const ingredientDoc = doc(ingredientsCollection, ingredientId.value);
        await updateDoc(ingredientDoc, {
            name: name.value,
            unit: unit.value
        });
        router.push('/ingredients')
    } catch (error) {
        console.error("Error updating ingredient:", error);
    }
}

onMounted(() => {
  fetchIngredient()
})
</script>

<template>
  <div>
    <div>
      <text>Ingredient Name:</text>
      <input type="text" placeholder="Ingredient Name" v-model="name" />
    </div>
    <div>
      <text>Ingredient Unit:</text>
      <input type="text" placeholder="Ingredient Unit" v-model="unit" />
    </div>
    <button @click="saveChanges">Save</button>
  </div>
</template>