<template>
  <UiModal v-model:open="open" size="sm" :description="copy.description">
    <template #header>
      <span
        class="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400"
      >
        <MoonIcon class="size-5" />
      </span>
      <h2 class="mt-4 text-lg leading-snug font-semibold">{{ copy.title }}</h2>
    </template>

    <template #footer>
      <UiButton variant="outline" radius="lg" @click="onSchedule">
        {{ copy.schedule }}
      </UiButton>
      <UiButton radius="lg" @click="onSend">{{ copy.send }}</UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import { MoonIcon } from '@lucide/vue'

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  send: []
  schedule: []
}>()

const copies = {
  suggest: {
    title: 'Schedule it for 8am instead?',
    description:
      'MTN holds bulk SMS sent between 8pm and 8am. For better delivery, schedule your message for 8am.',
    schedule: 'Schedule for 8am',
    send: 'Send now',
  },
  confirm: {
    title: 'Send it during the restriction?',
    description:
      "It's between 8pm and 8am, so MTN numbers won't get your message until 8am.",
    schedule: 'No, schedule it',
    send: 'Yes, send now',
  },
} as const

const step = ref<keyof typeof copies>('suggest')
const copy = computed(() => copies[step.value])

watch(open, (isOpen) => {
  if (isOpen) step.value = 'suggest'
})

const onSchedule = () => {
  open.value = false
  emit('schedule')
}

const onSend = () => {
  if (step.value === 'suggest') {
    step.value = 'confirm'
    return
  }
  open.value = false
  emit('send')
}
</script>
