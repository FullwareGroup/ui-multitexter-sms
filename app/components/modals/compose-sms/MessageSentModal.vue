<template>
  <UiModal
    v-model:open="open"
    size="sm"
    :description="message || 'Your message is on its way.'"
  >
    <template #header>
      <span
        class="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <CheckIcon class="size-5" :stroke-width="2.5" />
      </span>
      <h2 class="mt-4 text-lg leading-snug font-semibold">Message sent</h2>
    </template>

    <template #footer="{ close }">
      <UiButton variant="outline" radius="lg" @click="close">Close</UiButton>
      <UiButton radius="lg" @click="navigateTo(next.to)">
        {{ next.label }}
      </UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { CheckIcon } from '@lucide/vue'

const props = defineProps<{
  message?: string
  bulkId?: string
}>()

const open = defineModel<boolean>('open', { default: false })

const next = computed(() =>
  props.bulkId
    ? {
        to: `/dashboard/sms-detail/${props.bulkId}`,
        label: 'View message status',
      }
    : { to: '/dashboard/delivery-reports', label: 'View delivery report' },
)
</script>
