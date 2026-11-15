<template>
  <div class="py-6">
    <div class="dashboard-wrapper">
      <h1 class="text-2xl font-bold tracking-tight">Compose SMS</h1>
      <p class="text-muted-foreground mt-1 max-w-xl text-sm">
        Write your message, add numbers or pick your contact lists, then send it
        now or schedule it for later.
      </p>

      <div class="mt-6 max-w-2xl space-y-6 xl:max-w-264">
        <ComposeVerifyNotice
          v-if="userDetail && userDetail.activated !== 1"
          :email="userDetail.email"
        />
        <ComposeLowUnitNotice />

        <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <ComposeForm v-model:list-ids="listIds" />
          <ComposeContactList v-model="listIds" class="xl:sticky xl:top-24" />
        </div>
      </div>
    </div>

    <VerifyAccountModal v-model:open="verifyPrompt" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { $toast } = useNuxtApp()
const { userDetail } = storeToRefs(useUserStore())

const listIds = ref<number[]>([])
const verifyPrompt = ref(false)

onMounted(() => {
  if (route.query.success !== '1') return
  navigateTo(
    { query: { ...route.query, success: undefined } },
    { replace: true },
  )

  watch(
    userDetail,
    (detail) => {
      if (detail?.activated === 1) $toast.success('Your payment was successful')
      else verifyPrompt.value = true
    },
    { once: true },
  )
})

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useHead({
  title: 'Compose SMS',
})
</script>
