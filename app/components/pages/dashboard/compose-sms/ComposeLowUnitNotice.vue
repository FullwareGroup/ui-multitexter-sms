<template>
  <div
    v-if="isLow"
    class="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm sm:flex-row sm:items-center"
  >
    <div class="flex min-w-0 flex-1 gap-3">
      <CoinsIcon
        class="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400"
      />
      <div class="min-w-0">
        <p class="font-medium">You're running low on units</p>
        <p class="text-muted-foreground mt-0.5">
          You have {{ formatNumberWithComma(balance) }}
          {{ balance === 1 ? 'unit' : 'units' }} left. Buy more so your messages
          keep going out.
        </p>
      </div>
    </div>
    <UiButton
      variant="outline"
      size="sm"
      radius="lg"
      class="self-start sm:self-auto"
      @click="navigateTo('/dashboard/buy-sms-online')"
    >
      Buy more units
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { CoinsIcon } from '@lucide/vue'

const LOW_UNIT_THRESHOLD = 500

const { userDetail } = storeToRefs(useUserStore())

const balance = computed(() => parseNumber(userDetail.value?.balance ?? 0))
const isLow = computed(
  () => !!userDetail.value && balance.value <= LOW_UNIT_THRESHOLD,
)
</script>
