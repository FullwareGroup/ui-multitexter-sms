<template>
  <div
    class="scrollbar-thumb-grey bg-surface w-full scrollbar-thin scrollbar-track-transparent overflow-auto"
  >
    <table
      class="w-full border-collapse [&_td]:px-4 [&_td]:py-3 [&_td]:align-middle [&_td]:whitespace-nowrap"
    >
      <thead>
        <tr>
          <th
            v-for="(heading, index) in ['', ...headings]"
            :key="index"
            class="border-border bg-grey/50 dark:bg-grey/10 border-b px-4 py-3.5 text-left align-middle text-xs font-medium tracking-wide whitespace-nowrap uppercase"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="keyOf(row, index)"
          :class="[
            'border-border hover:bg-foreground/3 border-b text-sm transition-colors last:border-0',
            onRowClick && 'cursor-pointer',
          ]"
          @click="onRowClick?.(row)"
        >
          <td class="text-muted-foreground w-12">
            {{ incrementPageNumber(index, perPage, currentPage) }}.
          </td>
          <slot :row="row" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
interface Props {
  headings: string[]
  rows: T[]
  rowKey?: keyof T
  perPage?: number
  currentPage?: number
  onRowClick?: (row: T) => void
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: undefined,
  perPage: 30,
  currentPage: 1,
  onRowClick: undefined,
})

defineSlots<{ default(props: { row: T }): unknown }>()

const keyOf = (row: T, index: number) =>
  (row[props.rowKey ?? ('id' as keyof T)] as PropertyKey | undefined) ?? index
</script>
