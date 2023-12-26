<script setup>
import IconSupport from './icons/IconSupport.vue';
import NavBar from './NavBar.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
    <div id="header-container">
        <IconSupport />
        <NavBar v-if="userStore.isAuthenticated" /> 
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