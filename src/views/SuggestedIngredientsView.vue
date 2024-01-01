<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import EditModal from '@/components/EditModal.vue';
import { ref } from 'vue';
const db = useFirestore()
const suggestedIngredientsCollection = collection(db, 'suggested-ingredients')
const ingredients = useCollection(suggestedIngredientsCollection)

const open = ref(false)
const currentlyEditingIngredient = ref(null)
const editSuggestedIngredient = (choosenIngredient) => {
  currentlyEditingIngredient.value = choosenIngredient
  open.value = true
} 

const saveAction = async (ingredient) => {
  await updateDoc(doc(suggestedIngredientsCollection, ingredient.id), {
    name: ingredient.name,
    unit: ingredient.unit
  })
  open.value = false
}

const removeSuggestedIngredient = (id) => {
  if (confirm('Are you sure you want to remove this suggestion?')) {
    const ingredientDoc = doc(suggestedIngredientsCollection, id)
    deleteDoc(ingredientDoc)
  }
}
const addSuggestedIngredient = async (name, unit, id) => {
  if (confirm('Are you sure you want to add this ingredient?')) {
    const ingredientsCollection = collection(db, 'ingredients')
    await addDoc(ingredientsCollection, { name: name, unit: unit })
    const ingredientDoc = doc(suggestedIngredientsCollection, id)
    await deleteDoc(ingredientDoc)
  }
}

const closeAction = () => {
  open.value = false
}

</script>
<template>
  <EditModal
    v-if="open"
    :data="currentlyEditingIngredient"
    @close="closeAction"
    @save="saveAction(currentlyEditingIngredient)"
  />
  <table>
    <tr>
      <th>Ingredient Name</th>
      <th>Unit</th>
      <th>Actions</th>
    </tr>
    <tr v-for="ingredient in ingredients" :key="ingredient.id">
      <td>{{ ingredient.name }}</td>
      <td>{{ ingredient.unit }}</td>
      <td>
        <button @click="addSuggestedIngredient(ingredient.name, ingredient.unit, ingredient.id)">
          Add
        </button>
        <button @click="editSuggestedIngredient(ingredient)">Edit</button>
        <button @click="removeSuggestedIngredient(ingredient.id)">Remove</button>
      </td>
    </tr>
    <tr>
      <th>Ingredient Name</th>
      <th>Unit</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
