<template>
  <UiModal
    v-model:open="open"
    size="sm"
    description="Your account isn't verified yet. Verify it so your messages are delivered as reliably as possible."
  >
    <template #header>
      <span
        class="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <CheckIcon class="size-5" :stroke-width="2.5" />
      </span>
      <h2 class="mt-4 text-lg leading-snug font-semibold">
        Your payment was successful
      </h2>
    </template>

    <template #footer="{ close }">
      <UiButton variant="outline" radius="lg" @click="close">Not now</UiButton>
      <UiButton radius="lg" @click="navigateTo('/resend-activation')">
        Verify your account
      </UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { CheckIcon } from '@lucide/vue'

const open = defineModel<boolean>('open', { default: false })
</script>
