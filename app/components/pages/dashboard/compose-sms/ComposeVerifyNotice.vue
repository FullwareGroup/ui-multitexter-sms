<template>
  <div
    class="flex flex-col gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm sm:flex-row sm:items-center"
  >
    <div class="flex min-w-0 flex-1 gap-3">
      <ShieldAlertIcon
        class="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-400"
      />
      <div class="min-w-0">
        <p class="font-medium">Your account isn't verified yet</p>
        <p class="text-muted-foreground mt-0.5" aria-live="polite">
          <template v-if="cooldown">
            We've sent a link to <span class="break-all">{{ email }}</span
            >. You can ask for another in {{ cooldown }}s.
          </template>
          <template v-else>
            Verify it so your messages are delivered as reliably as possible.
          </template>
        </p>
      </div>
    </div>
    <UiButton
      v-if="!cooldown"
      variant="outline"
      size="sm"
      radius="lg"
      :loading="loading"
      class="self-start sm:self-auto"
      @click="sendLink"
    >
      Send verification link
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { ShieldAlertIcon } from '@lucide/vue'
import { apiClient } from '@/repository/api'

const COOLDOWN = 45

const props = defineProps<{
  email: string
}>()

const { $toast } = useNuxtApp()
const loading = ref(false)
const cooldown = ref(0)

const { pause, resume } = useIntervalFn(
  () => {
    cooldown.value -= 1
    if (cooldown.value <= 0) pause()
  },
  1000,
  { immediate: false },
)

const sendLink = async () => {
  try {
    loading.value = true
    const response = await apiClient.user.resendActivationCode(props.email)
    if (response.status === 1) {
      $toast.success(
        response.msg || 'Verification link sent. Check your email.',
      )
      cooldown.value = COOLDOWN
      resume()
    } else {
      $toast.error(
        response.msg || "We couldn't send the link. Please try again.",
      )
    }
  } catch (err) {
    $toast.error(formatErrorResponse(err))
  } finally {
    loading.value = false
  }
}
</script>
