<script setup>
import { useFirestore } from 'vuefire'
import { where, query, collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const router = useRouter()
const db = useFirestore()
const usersRef = collection(db, 'users')
const q = query(usersRef, where('isReported', '==', true))
const querySnap = await getDocs(q)
const reportedUsers = []
querySnap.forEach((doc) => {
  const docData = doc.data()
  reportedUsers.push({
    id: doc.id,
    username: docData.username,
    email: docData.email,
    created_at: docData.created_at,
    recipes: docData.recipes
  })
})
const viewUserRecipes = (id) => {
  router.push({ name: 'recipes', params: { id } })
}

const removeUser = (id) => {
  console.log(id)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>User Id</th>
        <th>Username</th>
        <th>Email</th>
        <th>Created At</th>
        <th>Recipes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in reportedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.created_at }}</td>
        <td>{{ user.recipes }}</td>
        <td>
          <button @click="viewUserRecipes(user.id)">View</button
          ><button @click="removeUser(user.id)">Remove</button>
        </td>
      </tr>
    </tbody>
    <thead>
      <tr>
        <th>User Id</th>
        <th>Username</th>
        <th>Email</th>
        <th>Created At</th>
        <th>Recipes</th>
        <th>Actions</th>
      </tr>
    </thead>
  </table>
</template>
