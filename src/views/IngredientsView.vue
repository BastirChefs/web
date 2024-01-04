<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore'
import EditModal from '../components/EditModal.vue'
import {ref} from 'vue'
const db = useFirestore()
const ingredientsCollection = collection(db, 'ingredients')
const q = query(ingredientsCollection, where('isVerified', '!=', false))
const ingredients = useCollection(q)
const open = ref(false)
const currentlyEditingIngredient = ref(null)
const editIngredient = (choosenIngredient) => {
    currentlyEditingIngredient.value = choosenIngredient
    open.value = true
}
const deleteIngredient = async (id) => {
    if(confirm('Are you sure you want to delete this ingredient?')){
       await deleteDoc(doc(ingredientsCollection, id))
    }
}

const closeAction = () => {
    open.value = false
}

const saveAction = async (ingredient) => {
    await updateDoc(doc(ingredientsCollection, ingredient.id), {
        name: ingredient.name,
        unit: ingredient.unit
    })
    open.value = false
}

const verifyIngredient = async (id) => {
    if(confirm('Are you sure you want to verify this ingredient?')){
        await updateDoc(doc(ingredientsCollection, id), {
            isVerified: true
        })
    }
}
</script>
<template>
    <EditModal v-if="open" :data="currentlyEditingIngredient" @close="closeAction" @save="saveAction(currentlyEditingIngredient)"/>
    <table>
        <tr>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th>Is Verified?</th>
            <th>Actions</th>
        </tr>
        <tr v-for="ingredient in ingredients" :key="ingredient.id">
            <td>{{ ingredient.name }}</td>
            <td>{{ ingredient.unit }}</td>
            <td>{{ !(ingredient.isVerified === false) }}</td>
            <td>
                <button @click="editIngredient(ingredient)">
                    Edit
                </button>
                <button @click="deleteIngredient(ingredient.id)">
                    Delete
                </button>
                <button v-if="(ingredient.isVerified === false)" @click="verifyIngredient(ingredient.id)">Verify</button>
            </td>
        </tr>
        <tr>
            <th>Ingredient Name</th>
            <th>Unit</th>
            <th>Is Verified?</th>
            <th>Actions</th>
        </tr>
    </table>
</template>
