<template>
  <UiModal
    v-model:open="open"
    size="sm"
    :description="message || copy.fallback"
  >
    <template #header>
      <span
        class="flex size-10 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400"
      >
        <component :is="copy.icon" class="size-5" />
      </span>
      <h2 class="mt-4 text-lg leading-snug font-semibold">{{ copy.title }}</h2>
    </template>

    <template #footer="{ close }">
      <UiButton variant="outline" radius="lg" @click="close">Close</UiButton>
      <UiButton radius="lg" @click="onAction">
        {{ copy.action }}
        <template v-if="reason === 'external'" #trailing>
          <ExternalLinkIcon class="size-4" />
        </template>
      </UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { CoinsIcon, ExternalLinkIcon, ShieldAlertIcon } from '@lucide/vue'

const props = defineProps<{
  reason: 'units' | 'external'
  message?: string
}>()

const open = defineModel<boolean>('open', { default: false })

const copies = {
  units: {
    icon: CoinsIcon,
    title: 'Not enough units',
    fallback:
      "You don't have enough units to send this message. Buy more, then try again.",
    action: 'Buy units',
  },
  external: {
    icon: ShieldAlertIcon,
    title: 'Send this message on SMSVend',
    fallback:
      "Telcos treat OTP messages as international traffic, so they can't be sent here. Send them on SMSVend instead.",
    action: 'Go to SMSVend',
  },
} as const

const copy = computed(() => copies[props.reason])

const onAction = () => {
  if (props.reason === 'units') {
    navigateTo('/dashboard/buy-sms-online')
    return
  }
  navigateTo('https://smsvend.com/', {
    external: true,
    open: { target: '_blank' },
  })
  open.value = false
}
</script>
