<template>
  <UiModal
    v-model:open="open"
    size="sm"
    title="Turn off the priority route?"
    description="Numbers on Do Not Disturb (DND) won't receive your message. The priority route reaches them on MTN for 2 units per page."
  >
    <template #footer="{ close }">
      <UiButton variant="outline" radius="lg" @click="close">
        Keep it on
      </UiButton>
      <UiButton radius="lg" @click="onConfirm">Turn it off</UiButton>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  cancel: []
}>()

let confirmed = false

watch(open, (isOpen) => {
  if (isOpen) confirmed = false
  else if (!confirmed) emit('cancel')
})

const onConfirm = () => {
  confirmed = true
  open.value = false
}
</script>
