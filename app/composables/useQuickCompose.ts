import { StorageSerializers } from '@vueuse/core'
import type { QuickComposeDraft } from '@/types/message'

export default function useQuickCompose() {
  const draft = useLocalStorage<QuickComposeDraft | null>(
    'quick-compose',
    null,
    { serializer: StorageSerializers.object },
  )

  return { draft }
}
