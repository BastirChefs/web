<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
const db = useFirestore()
const ingredients = useCollection(collection(db, 'ingredients'))
</script>
<template>
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      <div>
        {{ ingredient.name }}
      </div>
    </li>
  </ul>
</template>
