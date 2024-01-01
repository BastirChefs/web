<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import router from '../router'
const db = useFirestore()
const ingredientsCollection = collection(db, 'ingredients')
const ingredients = useCollection(ingredientsCollection)
const editIngredient = (id) => {
    router.push({name: 'ingredients/edit', params: {id: id}})
}
const deleteIngredient = async (id) => {
    if(confirm('Are you sure you want to delete this ingredient?')){
       await deleteDoc(doc(ingredientsCollection, id))
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
                <button @click="editIngredient(ingredient.id)">
                    Edit
                </button>
                <button @click="deleteIngredient(ingredient.id)">
                    Delete
                </button>
            </td>
        </tr>
        <tr>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th>Actions</th>
        </tr>
    </table>
</template>
