<script setup>
import { useFirestore } from 'vuefire'
import { collection, doc, getDoc, where, query, getDocs, deleteDoc } from 'firebase/firestore'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex';
import router from '../router'

const store = useStore();
const db = useFirestore()
const userId = ref(null)
const user = ref(null)
const name = ref('')
const userRecipes = ref([])

const fetchUser = async () => {
  try {
    const id = router.currentRoute.value.params.id
    userId.value = id

    const usersCollection = collection(db, 'users');
    const document1 = doc(usersCollection, id);

    const docSnapshot1 = await getDoc(document1);

    if (docSnapshot1.exists()) {
      user.value = docSnapshot1.data();
      name.value = user.value.username;
      const recipesCollection = collection(db, 'recipes');
      const q = query(recipesCollection, where('userId', '==', userId.value));
      const querySnap = await getDocs(q);
      querySnap.docs.map(doc => doc.id)
      querySnap.forEach(async (doc) => {
        //const docRef = doc.ref;
        userRecipes.value.push(doc.data());
      });
      console.log(userRecipes);
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const banUser = async () => {
    try {
        removeUserReport();
        const usersCollection = collection(db, 'users');
        const usersDoc = doc(usersCollection, userId.value);
        await deleteDoc(usersDoc);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
    router.go(-1)
}

const removeUserReport = async () => {
    if (userId.value !== null) {
        try {
            const reportedUsersCollection = collection(db, 'reported-users');
            const q = query(reportedUsersCollection, where('userId', '==', userId.value));
            const querySnap = await getDocs(q);

            console.log('Query Snapshot:', querySnap.docs.map(doc => doc.id));

            // Use Promise.all to wait for all delete operations to complete
            await Promise.all(querySnap.docs.map(async (doc) => {
                const docRef = doc.ref;
                await deleteDoc(docRef);
                console.log('Deleting:', docRef.path);
            }));

            // After all delete operations are complete, update the state
            store.commit('setDataLoaded', false);
            console.log("setted as false");

            // Log the current route path and try navigating back
            console.log('Current Route Path:', router.currentRoute.value.path);
            router.go(-1);
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    } else {
        console.warn("UserId is null. Cannot remove user report.");
    }
}

onMounted(() => {
  console.log("im mounted")
  fetchUser()
  console.log("im fetched");
});

onBeforeUnmount(async () => {
  // Add a delay to ensure that asynchronous operations complete before unmounting
  await new Promise(resolve => setTimeout(resolve, 100));
});

watch(userRecipes, (newVal) => {
  console.log('userRecipes changed:', newVal);
});
</script>

<template>
  <div>
    <div>
        <text>Do you really want to ban this user?</text>
    </div>
    <div>
      <text>Username:</text>
    </div>
    <div>
        {{ name }}
    </div>
    <table>
    <tr>
      <th>User Id</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
    </tr>
    <tr v-for="(recipe, index) in userRecipes" :key="index">
      <td>{{ recipe.userId }}</td>
      <td>{{ recipe.recipeName }}</td>
      <td>{{ recipe.recipeText }}</td>
      <td>{{ recipe.timeCreated }}</td>
    </tr>
    <tr>
      <th>User Id</th>
      <th>Recipe Name</th>
      <th>Recipe Text</th>
      <th>Time Created</th>
    </tr>
  </table>
    <button @click="banUser">Ban</button>
  </div>
</template>