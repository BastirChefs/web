<script setup>
import ReportedUsers from '../components/ReportedUsers.vue'
</script>

<template>
    <Suspense>
        <template #fallback>
            <div>Loading...</div>
        </template>
        <ReportedUsers />
    </Suspense>
</template>
