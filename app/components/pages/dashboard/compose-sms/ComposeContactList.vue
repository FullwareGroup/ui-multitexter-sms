<template>
  <section class="border-border bg-surface rounded-2xl border p-6">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h2 class="font-semibold">Contact lists</h2>
        <p class="text-muted-foreground mt-1 text-sm">{{ summary }}</p>
      </div>
      <button
        v-if="selected.length"
        type="button"
        class="text-primary hover:text-primary/80 focus-visible:ring-primary/35 shrink-0 cursor-pointer rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-2"
        @click="selected = []"
      >
        Clear
      </button>
    </div>

    <UiErrorState
      v-if="error"
      class="mt-5"
      description="We couldn't load your contact lists. Please try again."
      @try-again="fetchContactLists"
    />

    <div v-else-if="!lists" class="mt-5 space-y-3">
      <UiSkeleton v-for="n in 5" :key="n" class="h-11 w-full rounded-lg" />
    </div>

    <EmptyState
      v-else-if="!lists.length"
      class="mt-5"
      :icon="BookUserIcon"
      title="No contact lists yet"
      description="Save the numbers you text often as a list, then send to the whole list at once."
    >
      <template #actions>
        <UiButton
          variant="outline"
          radius="lg"
          @click="navigateTo('/dashboard/phonebook')"
        >
          Create a list
        </UiButton>
      </template>
    </EmptyState>

    <ul
      v-else
      class="divide-border mt-3 max-h-112 divide-y overflow-y-auto overscroll-contain"
    >
      <li v-for="list in lists" :key="list.contactlistid" class="py-3">
        <UiCheckbox
          :model-value="selected.includes(list.contactlistid)"
          :name="`list-${list.contactlistid}`"
          :label="list.contactist_name"
          :hint="contactsLabel(list.contactCount)"
          @update:model-value="toggle(list.contactlistid)"
        />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { BookUserIcon } from '@lucide/vue'

const selected = defineModel<number[]>({ default: () => [] })

const { lists, loading, error, fetchContactLists, countContacts } =
  useContactLists()

const contactsLabel = (count: string | number) =>
  Number(count) === 1 ? '1 contact' : `${formatNumberWithComma(count)} contacts`

const summary = computed(() => {
  const count = selected.value.length
  if (!count) return 'Send to everyone on one or more lists.'
  return `${count} ${count === 1 ? 'list' : 'lists'} selected · ${contactsLabel(countContacts(selected.value))}`
})

const toggle = (id: number) => {
  selected.value = selected.value.includes(id)
    ? selected.value.filter((value) => value !== id)
    : [...selected.value, id]
}

onMounted(() => {
  if (!loading.value) fetchContactLists()
})
</script>
