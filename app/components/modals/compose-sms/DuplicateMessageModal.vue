<template>
  <UiModal
    v-model:open="open"
    size="sm"
    title="Send this message again?"
    description="You sent the same message to the same numbers less than a minute ago. Each recipient will get it twice."
  >
    <template #footer="{ close }">
      <UiButton variant="outline" radius="lg" @click="close">Cancel</UiButton>
      <UiButton radius="lg" @click="onConfirm">Send again</UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  confirm: []
}>()

const onConfirm = () => {
  open.value = false
  emit('confirm')
}
</script>
