<template>
  <section>
    <p class="text-muted-foreground text-sm">
      Every credit and debit on your unit balance.
    </p>

    <div class="mt-4">
      <div v-if="loading" class="space-y-3">
        <UiSkeleton v-for="n in 5" :key="n" class="h-12 w-full rounded-lg" />
      </div>

      <UiErrorState v-else-if="error" @try-again="fetchTransactionHistory" />

      <EmptyState
        v-else-if="!rows.length"
        :icon="ArrowLeftRight"
        title="No transactions yet"
        description="Credits and debits on your unit balance will show up here."
      />

      <div v-else class="border-border overflow-hidden rounded-lg border">
        <UiTable
          v-slot="{ row: transaction }"
          :headings="headings"
          :rows="rows"
        >
          <td>
            {{ transaction.happenedAt.date }}
            <span
              v-if="transaction.happenedAt.time"
              class="text-muted-foreground block text-xs"
            >
              {{ transaction.happenedAt.time }}
            </span>
          </td>
          <td>
            <span
              class="bg-foreground/5 inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold capitalize"
            >
              {{ transaction.transaction || '—' }}
            </span>
          </td>
          <td class="font-medium">
            {{ formatNumberWithComma(transaction.units) }}
          </td>
          <td>
            {{ formatNumberWithComma(transaction.balance) }}
          </td>
          <td>
            <span class="block min-w-56 whitespace-normal">
              {{ transaction.description || '—' }}
            </span>
          </td>
        </UiTable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeftRight } from '@lucide/vue'
import type { TransactionHistory } from '@/types/history'
import { apiClient } from '@/repository/api'

const headings = ['Date', 'Transaction', 'Units', 'Balance', 'Description']
const transactions = ref<TransactionHistory[] | null>(null)
const loading = ref(true)
const error = ref(false)

const rows = computed(() =>
  (transactions.value ?? []).map((transaction) => ({
    ...transaction,
    happenedAt: {
      date: useDateFormat(transaction.date, 'Do MMM YYYY').value,
      time: transaction.date.includes(':')
        ? useDateFormat(transaction.date, 'h:mm a').value
        : null,
    },
  })),
)

const fetchTransactionHistory = async () => {
  try {
    loading.value = true
    error.value = false
    const response = await apiClient.history.fetchTransactionHistory()
    if (response) {
      transactions.value = response.msg
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(fetchTransactionHistory)
</script>
