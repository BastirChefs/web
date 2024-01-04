<script setup>
import { useFirestore } from 'vuefire'
import { where, query, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth';
const cloudUrl = "https://europe-central2-bastirchef-3aeef.cloudfunctions.net"
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
    userImage: docData.userImage,
    isDisabled: docData.isDisabled
  })
})
const viewUserRecipes = (id) => {
  router.push({ name: 'recipes', params: { id } })
}

const auth = getAuth();

const enableUser = async (id) => {
  await fetch(cloudUrl + "/enableUser?userId=" + id + '&adminId=' + auth.currentUser.uid, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      },
  })
}
const disableUser = async (id) => {
  await fetch(cloudUrl + "/disableUser?userId=" + id + '&adminId=' + auth.currentUser.uid, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      },
  })
}



const deleteUser = async (id) => {
  await fetch(cloudUrl + "/banUser?userId=" + id + '&adminId=' + auth.currentUser.uid, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
      },
  })

  
}

</script>

<template>
  <table>
    <thead>
      <tr>
        <th>User Image</th>
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
        <td> <img :src="user.userImage" alt="User Image" width="100" height="100"></td>
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.created_at }}</td>
        <td><button @click="viewUserRecipes(user.id)">View</button
          ></td>
        <td>
          <button v-if="!user.isDisabled" @click="disableUser(user.id)">Disable</button>
          <button v-else @click="enableUser(user.id)">Enable</button>
          <button @click="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
    <thead>
      <tr>
        <th>User Image</th>
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
