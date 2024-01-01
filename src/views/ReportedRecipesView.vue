<script setup>
import ReportedRecipes from '@/components/ReportedRecipes.vue'
</script>
<template>
    <Suspense>
        <template #fallback>
            <div>Loading...</div>
        </template>
        <ReportedRecipes />
    </Suspense>
</template>