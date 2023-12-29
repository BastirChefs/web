<script setup>
import { useCollection, useFirestore } from 'vuefire'
import { collection } from 'firebase/firestore'
import router from '../router'
const db = useFirestore();
const reportDetails = (id) => {
  router.push({name: 'reportedUsers/details', params: {id: id}})
}
const reportedUsers = useCollection(collection(db, 'reported-users'))
</script>
<template>
    <table>
        <tr>
            <th>Username</th>
            <th>Actions</th>
        </tr>
        <tr v-for="user in reportedUsers" :key="user.userId">
            <td>{{ user.userId }}</td>
            <td>
                <button @click="reportDetails(user.userId)">
                    View
                </button>
            </td>
        </tr>
        <tr>
            <th>Username</th>
            <th>Actions</th>
        </tr>
    </table>
</template>
