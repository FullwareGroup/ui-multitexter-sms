<template>
  <section class="py-16 lg:py-24">
    <div
      class="wrapper grid items-center gap-12 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:gap-16"
    >
      <div class="order-last grid gap-4 xl:order-first">
        <div
          v-motion-slide-visible-once-bottom
          class="bg-surface border-border rounded-xl border p-6 sm:p-8"
        >
          <span
            class="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl"
          >
            <CreditCard class="size-5" />
          </span>
          <h3 class="mt-6 text-lg font-semibold">Pay online</h3>
          <p class="text-muted-foreground mt-2 text-sm leading-relaxed">
            Pay with your ATM, credit or debit card and your units are credited
            instantly.
          </p>
          <ul aria-label="Accepted cards" class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="(method, index) in methods"
              :key="method"
              v-motion-pop-visible-once
              :delay="300 + index * 60"
              class="border-border bg-background/60 rounded-lg border px-3 py-1.5 text-xs font-medium"
            >
              {{ method }}
            </li>
          </ul>
        </div>

        <div
          v-motion-slide-visible-once-bottom
          :delay="100"
          class="bg-sand text-charcoal relative overflow-hidden rounded-xl"
        >
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-white/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-charcoal)_1px,transparent_1px)] mask-[linear-gradient(to_right,black,transparent_70%)] bg-size-[20px_20px] opacity-10"
          />

          <div
            class="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-center gap-4">
              <NuxtImg
                src="/images/providus-bank.png"
                alt=""
                width="56"
                height="56"
                loading="lazy"
                class="size-14 shrink-0 rounded-xl shadow-lg shadow-black/15"
              />
              <div>
                <p
                  class="text-charcoal/60 text-xs font-semibold tracking-[0.25em] uppercase"
                >
                  Bank transfer
                </p>
                <h3 class="mt-1 text-xl font-semibold tracking-tight">
                  Providus Bank
                </h3>
                <p class="text-charcoal/70 mt-1 text-sm leading-relaxed">
                  Make a deposit, online transfer or ATM transfer into our
                  account.
                </p>
              </div>
            </div>
            <p
              class="border-charcoal/15 bg-charcoal/5 inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs font-semibold md:self-auto"
            >
              <LayoutDashboard class="size-3.5" />
              Account details in your dashboard
            </p>
          </div>
        </div>
      </div>

      <div>
        <p
          v-motion-fade-visible-once
          class="text-primary text-xs font-semibold tracking-[0.25em] uppercase"
        >
          Payments
        </p>
        <h2
          v-motion-reveal
          :delay="100"
          class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Multiple and flexible payment options
        </h2>
        <p
          v-motion-fade-visible-once
          :delay="300"
          class="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed"
        >
          With either Bank Deposits or Online Transfer, payment is easily
          integrated to give you your SMS units. We accept MasterCard, Verified
          by Visa, eTranzact, Verve and Interswitch Cards for online payments
          and for Bank Deposits, First Bank, Diamond Bank, GTBank and Zenith
          Bank.
        </p>
        <div v-motion-fade-visible-once :delay="450" class="mt-8">
          <NuxtLink
            to="/pricing"
            class="bg-primary text-dark-blue hover:bg-primary/85 focus-visible:ring-primary/40 inline-flex h-12 items-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3"
          >
            View Pricing
            <ArrowRight class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, CreditCard, LayoutDashboard } from '@lucide/vue'

const methods = [
  'MasterCard',
  'Verified by Visa',
  'eTranzact',
  'Verve',
  'Interswitch',
]
</script>
