<template>
  <section class="border-border bg-surface rounded-2xl border p-6 sm:p-8">
    <div v-if="prefilling" class="space-y-5">
      <div class="grid gap-5 sm:grid-cols-2">
        <UiSkeleton class="h-16 w-full rounded-lg" />
        <UiSkeleton class="h-16 w-full rounded-lg" />
      </div>
      <UiSkeleton class="h-36 w-full rounded-lg" />
      <UiSkeleton class="h-44 w-full rounded-lg" />
      <UiSkeleton class="h-16 w-full rounded-lg" />
    </div>

    <form v-else novalidate @submit="onSubmit">
      <p
        v-if="scheduleId"
        class="bg-primary/5 text-muted-foreground mb-6 flex gap-3 rounded-xl p-4 text-sm"
      >
        <InfoIcon class="text-primary mt-0.5 size-4 shrink-0" />
        You're editing a scheduled message. Save your changes to update it.
      </p>

      <div class="space-y-5">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <UiSelect
              v-model="country"
              name="country"
              label="Country"
              :options="countryOptions"
              :placeholder="
                countries ? 'Choose a country' : 'Loading countries…'
              "
              searchable
              search-placeholder="Search countries…"
              :disabled="!countries"
              :error="
                countriesError ? `We couldn't load countries.` : undefined
              "
            />
            <button
              v-if="countriesError"
              type="button"
              class="text-primary hover:text-primary/80 focus-visible:ring-primary/35 mt-1 cursor-pointer rounded-sm text-sm font-medium transition-colors outline-none focus-visible:ring-2"
              @click="fetchCountries"
            >
              Try again
            </button>
          </div>

          <UiAutoComplete
            v-model="senderName"
            name="senderName"
            label="Sender name"
            maxlength="11"
            placeholder="MyBrand"
            :options="senderOptions"
            hint="Up to 11 characters. Don't use a bank's name."
            :error="errors.senderName"
          />
        </div>

        <div>
          <UiTextarea
            v-model="recipients"
            name="recipients"
            label="Type a number"
            :rows="5"
            placeholder="e.g. 08012345678, 2348098765432"
            :error="errors.recipients"
            @blur="formatRecipients"
            @keypress="isNumber"
          />
          <p
            class="text-muted-foreground mt-1.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm"
          >
            <span>
              Numbers:
              <strong class="text-primary tabular-nums">
                {{ formatNumberWithComma(totalRecipients) }}
              </strong>
            </span>
            <span>
              From lists:
              <strong class="text-primary tabular-nums">
                {{ formatNumberWithComma(countContacts(listIds)) }}
              </strong>
            </span>
          </p>
        </div>

        <div>
          <UiTextarea
            v-model="message"
            name="message"
            label="Message"
            :rows="6"
            :error="errors.message"
            @keypress="replaceKeyword"
            @keydown="prefixSenderName"
          />
          <p
            class="text-muted-foreground mt-1.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm"
          >
            <span>
              Characters:
              <strong class="text-primary tabular-nums">
                {{ count }}/{{ maxCharacter }}
              </strong>
            </span>
            <span>
              Pages:
              <strong class="text-primary tabular-nums">{{ page }}</strong>
            </span>
          </p>
        </div>

        <UiSelect
          v-model="messageType"
          name="messageType"
          label="Message type"
          :options="messageTypeOptions"
          :hint="messageTypeHint"
        />

        <div class="border-border space-y-5 border-t pt-5">
          <UiSwitch
            v-model="sendLater"
            name="sendLater"
            label="Send later"
            hint="Pick a date and time, and repeat it if you need to."
          />

          <div v-if="sendLater" class="grid gap-5 sm:grid-cols-2">
            <UiDatePicker
              v-model="date"
              name="date"
              label="Date"
              type="date"
              format="D MMM YYYY"
              value-type="YYYY-MM-DD"
              placeholder="Pick a date"
              :disabled-date="isPast"
              :error="errors.date"
            />
            <UiDatePicker
              v-model="time"
              name="time"
              label="Time"
              type="time"
              format="h:mm A"
              value-type="HH:mm:ss"
              placeholder="Pick a time"
              :error="errors.time"
            />
            <UiSelect
              v-model="recurrentType"
              name="recurrentType"
              label="Repeat"
              :options="recurrentOptions"
            />
            <UiInput
              v-if="recurrentType !== 0"
              v-model="recurrentCount"
              name="recurrentCount"
              label="Number of times"
              inputmode="numeric"
              maxlength="2"
              :hint="`Up to ${MAX_REPEATS} times.`"
              :error="errors.recurrentCount"
              @keypress="isNumber"
            />
          </div>

          <UiCheckbox v-model="priorityRoute" name="priorityRoute">
            Priority Route: Override DND For more info
            <NuxtLink
              to="/network-status"
              target="_blank"
              class="text-primary hover:text-primary/80 focus-visible:ring-primary/35 rounded-sm font-medium transition-colors outline-none focus-visible:ring-2"
            >
              View network status
            </NuxtLink>
          </UiCheckbox>
        </div>
      </div>

      <UiFormError v-if="errorMessage" :message="errorMessage" class="mt-5" />

      <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <template v-if="!sendLater">
          <UiButton
            variant="outline"
            radius="lg"
            :loading="pending === 'draft'"
            :disabled="!!pending && pending !== 'draft'"
            @click="onSaveDraft"
          >
            <template #leading>
              <FilePenIcon class="size-4" />
            </template>
            Save as draft
          </UiButton>
          <UiButton
            type="submit"
            radius="lg"
            :loading="pending === 'send'"
            :disabled="!!pending && pending !== 'send'"
          >
            <template #leading>
              <SendIcon class="size-4" />
            </template>
            Send message
          </UiButton>
        </template>
        <UiButton
          v-else
          type="submit"
          radius="lg"
          :loading="pending === 'schedule'"
        >
          <template #leading>
            <CalendarClockIcon class="size-4" />
          </template>
          {{ scheduleId ? 'Save changes' : 'Schedule message' }}
        </UiButton>
      </div>
    </form>

    <PriorityRouteModal
      v-model:open="confirmingRoute"
      @cancel="priorityRoute = true"
    />
    <DuplicateMessageModal
      v-model:open="confirmingDuplicate"
      @confirm="sendNow"
    />
    <AfterHoursModal
      v-model:open="confirmingAfterHours"
      @send="sendMessage"
      @schedule="scheduleForMorning"
    />
    <MessageSentModal
      v-model:open="sent.open"
      :message="sent.message"
      :bulk-id="sent.bulkId"
    />
    <SendFailedModal
      v-model:open="failure.open"
      :reason="failure.reason"
      :message="failure.message"
    />
  </section>
</template>

<script setup lang="ts">
import * as Yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { FetchError } from 'ofetch'
import { CalendarClockIcon, FilePenIcon, InfoIcon, SendIcon } from '@lucide/vue'
import { apiClient } from '@/repository/api'
import type { SelectOption } from '@/components/ui/UiSelect.vue'
import type { MessageReq, MessageRes, RecurrentType } from '@/types/message'

const NIGERIA = 180
const STANDARD_SMS = 1
const FLASH_SMS = 2
const MAX_REPEATS = 10
const DUPLICATE_WINDOW = 60_000
const EXTERNAL_ROUTE = -2
const SESSION_EXPIRED = -3
const INSUFFICIENT_UNITS = -7

const listIds = defineModel<number[]>('listIds', { default: () => [] })

const route = useRoute()
const { $toast } = useNuxtApp()
const { fetchUserDetails } = useAuth()
const { senderIds, fetchSenderIds } = useSenderIds()
const { countries, error: countriesError, fetchCountries } = useCountry()
const { countContacts } = useContactLists()
const { draft: quickCompose } = useQuickCompose()
const recurrentTypes = useState<RecurrentType[] | null>(
  'recurrent-types',
  () => null,
)

const scheduleId = Number(route.query.schedule) || null

const messageTypeOptions: SelectOption[] = [
  {
    value: STANDARD_SMS,
    label: 'Standard SMS',
    description: "Saves to the recipient's phone automatically.",
  },
  {
    value: FLASH_SMS,
    label: 'Flash SMS',
    description:
      'Pops up on screen. The recipient chooses to save or discard it.',
  },
]

const defaultValue = () => ({
  senderName: '',
  recipients: '',
  message: '',
  sendLater: false,
  date: null as string | null,
  time: null as string | null,
  recurrentType: 0,
  recurrentCount: '1',
})

const schema = Yup.object({
  senderName: Yup.string()
    .trim()
    .required('Enter a sender name')
    .max(11, 'Use 11 characters or fewer'),
  recipients: Yup.string()
    .trim()
    .test(
      'required',
      'Enter at least one phone number, or pick a contact list',
      (value) => !!value || listIds.value.length > 0,
    ),
  message: Yup.string().trim().required('Enter a message'),
  sendLater: Yup.boolean(),
  date: Yup.string()
    .nullable()
    .when('sendLater', {
      is: true,
      then: (schema) => schema.required('Pick a date'),
    }),
  time: Yup.string()
    .nullable()
    .when('sendLater', {
      is: true,
      then: (schema) => schema.required('Pick a time'),
    }),
  recurrentType: Yup.number(),
  recurrentCount: Yup.string().when(['sendLater', 'recurrentType'], {
    is: (sendLater: boolean, recurrentType: number) =>
      sendLater && recurrentType !== 0,
    then: (schema) =>
      schema
        .required('Enter how many times to send it')
        .matches(/^([1-9]|10)$/, `Enter a number from 1 to ${MAX_REPEATS}`),
  }),
})

const { errors, handleSubmit, resetForm, validateField, values } = useForm({
  validationSchema: schema,
  initialValues: { ...defaultValue(), sendLater: !!route.query.new },
})
const { value: senderName } = useField<string>('senderName')
const { value: recipients } = useField<string>('recipients')
const { value: message } = useField<string>('message')
const { value: sendLater } = useField<boolean>('sendLater')
const { value: date } = useField<string | null>('date')
const { value: time } = useField<string | null>('time')
const { value: recurrentType } = useField<number>('recurrentType')
const { value: recurrentCount } = useField<string>('recurrentCount')

const country = ref(NIGERIA)
const messageType = ref(STANDARD_SMS)
const priorityRoute = ref(true)
const prefilling = ref(false)
const pending = ref<'send' | 'draft' | 'schedule' | null>(null)
const errorMessage = ref('')
const confirmingRoute = ref(false)
const confirmingDuplicate = ref(false)
const confirmingAfterHours = ref(false)
const sent = ref({ open: false, message: '', bulkId: '' })
const failure = ref({
  open: false,
  reason: 'units' as 'units' | 'external',
  message: '',
})

let lastSent: { recipients: string; message: string; at: number } | null = null

const {
  count,
  maxCharacter,
  page,
  totalRecipients,
  formatRecipients,
  checkMessageLength,
  replaceKeyword,
} = useComposeMessage(recipients, message)

const senderOptions = computed(
  () => senderIds.value?.map(({ sender }) => sender) ?? [],
)

const countryOptions = computed<SelectOption[]>(() =>
  (countries.value ?? []).map(({ id, name }) => ({ value: id, label: name })),
)

const recurrentOptions = computed<SelectOption[]>(() => [
  { value: 0, label: "Don't repeat" },
  ...(recurrentTypes.value ?? []).map(({ id, name }) => ({
    value: id,
    label: name.charAt(0).toUpperCase() + name.slice(1),
  })),
])

const messageTypeHint = computed(
  () =>
    messageTypeOptions.find((option) => option.value === messageType.value)
      ?.description,
)

watch(message, checkMessageLength)

watch(listIds, () => {
  if (errors.value.recipients) validateField('recipients')
})

watch(recurrentCount, (value) => {
  if (Number(value) > MAX_REPEATS) recurrentCount.value = String(MAX_REPEATS)
})

const isPast = (day: Date) => day < new Date(new Date().setHours(0, 0, 0, 0))

const prefixSenderName = () => {
  if (senderName.value && !message.value.startsWith(senderName.value)) {
    message.value = `${senderName.value}: ${message.value}`
  }
}

const onPriorityRouteToggle = (on: boolean) => {
  if (!on && !prefilling.value) confirmingRoute.value = true
}

watch(priorityRoute, onPriorityRouteToggle, { flush: 'sync' })

const fetchRecurrentTypes = async () => {
  try {
    const response = await apiClient.message.fetchRecurrentTypes()
    recurrentTypes.value = Array.isArray(response) ? response : []
  } catch {
    //
  }
}

const fillForm = (
  saved: Partial<ReturnType<typeof defaultValue>>,
  options: { forcednd?: number; messageTypeId?: number } = {},
) => {
  resetForm({ values: { ...defaultValue(), ...saved } })
  if (options.forcednd !== undefined)
    priorityRoute.value = options.forcednd !== 0
  if (options.messageTypeId !== undefined) {
    messageType.value =
      options.messageTypeId === FLASH_SMS ? FLASH_SMS : STANDARD_SMS
  }
}

const restoreQuickCompose = () => {
  const saved = quickCompose.value
  if (!saved) return
  fillForm({
    senderName: saved.senderName ?? '',
    recipients: saved.recipients ?? '',
    message: saved.message ?? '',
    sendLater: !!route.query.new,
  })
  quickCompose.value = null
}

const prefill = async () => {
  const sentId = Number(route.query.sentid)
  const draftId = Number(route.query.draft)
  if (!sentId && !draftId && !scheduleId) return restoreQuickCompose()

  try {
    prefilling.value = true
    if (sentId) {
      const response = await apiClient.message.fetchSentMessage(sentId)
      if (response.status === 1) {
        const { sender_name, recipient, content } = response.data
        fillForm({
          senderName: sender_name,
          recipients: recipient,
          message: content,
        })
      }
    } else if (draftId) {
      const response = await apiClient.message.fetchDraft(draftId)
      if (response.status === 1) {
        const { displayname, recipient, forcednd, message_type_id } =
          response.msg
        fillForm(
          {
            senderName: displayname,
            recipients: recipient,
            message: response.msg.message,
          },
          { forcednd, messageTypeId: message_type_id },
        )
      }
    } else if (scheduleId) {
      const response = await apiClient.message.fetchScheduledMessage(scheduleId)
      if (response.status === 1) {
        const scheduled = response.data
        const [day = null, clock = null] = scheduled.dispatchtime.split(' ')
        fillForm(
          {
            senderName: scheduled.displayname,
            recipients: scheduled.recipient,
            message: scheduled.message,
            sendLater: true,
            date: day,
            time: clock,
            recurrentType: scheduled.recurrent_type,
            recurrentCount: String(scheduled.recurrent_count || 1),
          },
          {
            forcednd: scheduled.forcednd,
            messageTypeId: scheduled.message_type_id,
          },
        )
        if (scheduled.country_id) country.value = scheduled.country_id
        listIds.value = splitContactListIds(scheduled.listids).map(Number)
      }
    }
  } catch (err) {
    $toast.error(formatErrorResponse(err))
  } finally {
    prefilling.value = false
  }
}

const toRequest = (): MessageReq => ({
  senderName: values.senderName.trim(),
  message: values.message,
  recipients: values.recipients,
  dnd: priorityRoute.value ? 1 : 0,
  listIds: listIds.value.join(','),
  countryCode: country.value,
  messageType: messageType.value,
  source: 'web',
})

const showFailure = (reason: 'units' | 'external', text?: string) => {
  failure.value = { open: true, reason, message: text ?? '' }
}

const handleError = (err: unknown) => {
  const data = (err as FetchError<Partial<MessageRes>> | null)?.data
  if (data?.status === EXTERNAL_ROUTE) showFailure('external', data.msg)
  else errorMessage.value = formatErrorResponse(err)
}

const isDuplicate = () =>
  !!lastSent &&
  Date.now() - lastSent.at < DUPLICATE_WINDOW &&
  lastSent.recipients === values.recipients &&
  lastSent.message === values.message

const sendMessage = async () => {
  try {
    pending.value = 'send'
    errorMessage.value = ''
    const request = toRequest()
    const response = await apiClient.message.sendMessage(request)
    if (response.status === 1) {
      lastSent = {
        recipients: request.recipients,
        message: request.message,
        at: Date.now(),
      }
      resetForm({ values: defaultValue() })
      listIds.value = []
      fetchUserDetails()
      sent.value = {
        open: true,
        message: response.msg,
        bulkId: response.bulk_id ?? '',
      }
    } else if (response.status === INSUFFICIENT_UNITS) {
      showFailure('units', response.msg)
    } else if (response.status === SESSION_EXPIRED) {
      $toast.error(response.msg)
      navigateTo('/logout')
    } else {
      errorMessage.value =
        response.msg || "We couldn't send your message. Please try again."
    }
  } catch (err) {
    handleError(err)
  } finally {
    pending.value = null
  }
}

const scheduleMessage = async () => {
  try {
    pending.value = 'schedule'
    errorMessage.value = ''
    const request: MessageReq = {
      ...toRequest(),
      sendTime: new Date(`${values.date}T${values.time}Z`).toISOString(),
      sendLater: true,
      recurrentType: values.recurrentType,
      recurrentCount: Number(values.recurrentCount) || 1,
    }
    const response = scheduleId
      ? await apiClient.message.editScheduledMessage({
          ...request,
          id: scheduleId,
        })
      : await apiClient.message.sendMessage(request)
    if (response.status === 1) {
      $toast.success(response.msg || 'Your message is scheduled.')
      await navigateTo('/dashboard/scheduled-sms')
    } else {
      errorMessage.value =
        response.msg || "We couldn't schedule your message. Please try again."
    }
  } catch (err) {
    handleError(err)
  } finally {
    pending.value = null
  }
}

const isAfterHours = () => {
  const hour = new Date().getHours()
  return hour >= 20 || hour < 8
}

const sendNow = () => {
  if (isAfterHours()) {
    confirmingAfterHours.value = true
    return
  }
  return sendMessage()
}

const scheduleForMorning = () => {
  const morning = new Date()
  if (morning.getHours() >= 8) morning.setDate(morning.getDate() + 1)
  const pad = (part: number) => String(part).padStart(2, '0')
  sendLater.value = true
  date.value = `${morning.getFullYear()}-${pad(morning.getMonth() + 1)}-${pad(morning.getDate())}`
  time.value = '08:00:00'
}

const onSubmit = handleSubmit(() => {
  errorMessage.value = ''
  if (values.sendLater) return scheduleMessage()
  if (isDuplicate()) {
    confirmingDuplicate.value = true
    return
  }
  return sendNow()
})

const onSaveDraft = handleSubmit(async () => {
  try {
    pending.value = 'draft'
    errorMessage.value = ''
    const response = await apiClient.message.saveAsDraft(toRequest())
    if (response.status === 1) {
      $toast.success(response.msg || 'Saved to your drafts.')
      await navigateTo('/dashboard/drafts')
    } else {
      errorMessage.value =
        response.msg || "We couldn't save your draft. Please try again."
    }
  } catch (err) {
    errorMessage.value = formatErrorResponse(err)
  } finally {
    pending.value = null
  }
})

onMounted(() => {
  if (!senderIds.value) fetchSenderIds()
  if (!countries.value) fetchCountries()
  if (!recurrentTypes.value) fetchRecurrentTypes()
  prefill()
})
</script>
