<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
const db = useFirestore()
const ingredients = useCollection(collection(db, 'ingredients'))
const editIngredient = (id) => {
    router.push({name: 'ingredients/edit', params: {id: id}})
}
const deleteIngredient = (id) => {
    router.push({name: 'ingredients/delete', params: {id: id}})
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
