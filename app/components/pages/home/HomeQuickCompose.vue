<template>
  <div
    class="bg-surface/20 border-border rounded-xl border p-5 shadow-xl shadow-black/5 sm:p-8"
  >
    <h2 class="text-lg font-semibold">Quick compose</h2>
    <div class="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
      <div>
        <UiInput
          id="compose-sender"
          v-model="sender"
          label="From"
          name="sender"
          placeholder="Sender name"
          autocomplete="off"
          class="mt-2"
          @keypress="onlyAlphabets"
        />
        <p class="text-muted-foreground mt-2 text-xs">
          Note: Don't use bank names
        </p>
      </div>

      <div>
        <UiInput
          id="compose-recipients"
          v-model="recipients"
          label="Type a number"
          name="recipients"
          placeholder="e.g. 08152425262,2347047373872"
          autocomplete="off"
          class="mt-2"
          @keypress="isNumber"
          @blur="formatRecipients"
        />
        <p class="text-muted-foreground mt-2 text-xs">
          Numbers:
          <strong class="text-foreground font-semibold tabular-nums">
            {{ formatNumberWithComma(totalRecipients) }}
          </strong>
        </p>
      </div>
    </div>

    <div class="mt-5">
      <UiTextarea
        id="compose-message"
        v-model="message"
        label="Message"
        name="message"
        placeholder="Message"
        :rows="4"
        maxlength="1224"
        class="mt-2"
        @keypress="replaceKeyword"
      />
      <div
        class="text-muted-foreground mt-2 flex items-center justify-between gap-4 text-xs tabular-nums"
      >
        <p>
          Characters left:
          <strong class="text-foreground font-semibold">
            {{ charactersLeft }}</strong
          >/{{ maxCharacter }}
        </p>
        <p>
          Page(s):
          <strong class="text-foreground font-semibold">{{ page }}</strong>
        </p>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <NuxtLink
        v-if="isLoggedIn"
        to="/dashboard/compose-sms"
        class="bg-primary text-dark-blue hover:bg-primary/85 focus-visible:ring-primary/40 flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3 sm:flex-1"
        @click="carryOver"
      >
        Continue to compose
        <ArrowRight class="size-4" />
      </NuxtLink>
      <template v-else>
        <NuxtLink
          to="/signup"
          class="bg-primary text-dark-blue hover:bg-primary/85 focus-visible:ring-primary/40 flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3 sm:flex-1"
        >
          Register to send
          <ArrowRight class="size-4" />
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="border-border hover:bg-primary/10 focus-visible:ring-primary/30 flex h-12 items-center justify-center rounded-lg border px-8 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3"
        >
          Login
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

const { isLoggedIn } = storeToRefs(useUserStore())
const { draft } = useQuickCompose()

const sender = ref('')
const recipients = ref('')
const message = ref('')

const {
  count,
  maxCharacter,
  page,
  totalRecipients,
  formatRecipients,
  checkMessageLength,
  replaceKeyword,
  onlyAlphabets,
} = useComposeMessage(recipients, message)

const charactersLeft = computed(() => maxCharacter.value - count.value)

watch(message, checkMessageLength)

watch([sender, recipients, message], ([senderName, numbers, text]) => {
  draft.value =
    senderName.trim() && numbers.trim() && text.trim()
      ? { senderName: senderName.trim(), recipients: numbers, message: text }
      : null
})

const carryOver = () => {
  if (!sender.value.trim() && !recipients.value.trim() && !message.value.trim())
    return
  draft.value = {
    senderName: sender.value.trim(),
    recipients: recipients.value,
    message: message.value,
  }
}
</script>
