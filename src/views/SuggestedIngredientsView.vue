<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, addDoc, deleteDoc  } from 'firebase/firestore'
import router from '../router'
const db = useFirestore()
const ingredients = useCollection(collection(db, 'suggested-ingredients'))
const addIngredient = (id) => {
  router.push({ name: 'suggestedIngredients/add', params: { id: id } })
}
const removeSuggestion = (id) => {
  router.push({ name: 'suggestedIngredients/remove', params: { id: id } })
}
const directAddIngredient = async (name, unit, id) => {
    try {
        const ingredientsCollection = collection(db, 'ingredients');
        await addDoc(ingredientsCollection, {name: name, unit: unit});
        const suggestedIngredientsCollection = collection(db, 'suggested-ingredients');
        const ingredientDoc = doc(suggestedIngredientsCollection, id);
        await deleteDoc(ingredientDoc);
    } catch (error) {
        console.error("Error updating ingredient:", error);
    }
}
</script>
<template>
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
        <button @click="directAddIngredient(ingredient.name, ingredient.unit, ingredient.id)">Add</button>
        <button @click="addIngredient(ingredient.id)">Edit</button>
        <button @click="removeSuggestion(ingredient.id)">Remove</button>
      </td>
    </tr>
    <tr>
      <th>Ingredient Name</th>
      <th>Unit</th>
      <th>Actions</th>
    </tr>
  </table>
</template>
