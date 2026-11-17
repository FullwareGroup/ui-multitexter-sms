<template>
  <Transition name="slide-down">
    <div
      v-if="show"
      role="status"
      :class="[
        isOnline
          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
          : 'bg-red-500/10 text-red-600 dark:text-red-400',
      ]"
      class="flex w-full items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium"
    >
      <Wifi v-if="isOnline" class="size-3.5 shrink-0" />
      <WifiOff v-else class="size-3.5 shrink-0" />
      {{
        isOnline
          ? "You're back online"
          : "You're offline, check your internet connection"
      }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Wifi, WifiOff } from '@lucide/vue'

const { isOnline } = useNetwork()
const show = ref(false)

let timer: ReturnType<typeof setTimeout> | undefined

watch(
  isOnline,
  (online) => {
    clearTimeout(timer)
    if (online) timer = setTimeout(() => (show.value = false), 1000)
    else show.value = true
  },
  { immediate: true },
)
</script>
