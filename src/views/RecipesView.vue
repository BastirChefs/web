<script setup>
import UserRecipes from '../components/UserRecipes.vue';
</script>
<template>
    <Suspense>
        <template #fallback>
            <div>Loading...</div>
        </template>
        <UserRecipes />
    </Suspense>
</template>
