<template>
  <ColorScheme placeholder="..." tag="span">
    <button
      class="hover:bg-grey dark:hover:bg-grey/5 flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors ease-in"
      type="button"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="colorMode.preference = isDark ? 'light' : 'dark'"
    >
      <SunIcon v-if="isDark" :size="18" />
      <MoonIcon v-else :size="18" />
    </button>
  </ColorScheme>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue'

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
</script>
