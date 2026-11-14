<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Compose SMS',
})
</script>
