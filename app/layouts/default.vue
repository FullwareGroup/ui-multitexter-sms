<template>
  <div
    class="theme-brand bg-background text-foreground flex min-h-screen flex-col"
  >
    <AppHeader />
    <div class="bg-background relative flex-1">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: 'theme-color', content: '#1e1e1c' }],
})
</script>
