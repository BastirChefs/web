<script setup>
import IconSupport from './icons/IconSupport.vue';
import NavBar from './NavBar.vue';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const isAuthenticated = ref(getAuth().currentUser !== null);
onAuthStateChanged(getAuth(), (user) => {
    isAuthenticated.value = user !== null;
});
</script>

<template>
    <div id="header-container">
        <IconSupport />
        <NavBar v-if="isAuthenticated" /> 
    </div>
    
</template>

<style>
#header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #cb5e11;
    color: white;
    padding: 10px;
    height: 8vh;
}
</style>