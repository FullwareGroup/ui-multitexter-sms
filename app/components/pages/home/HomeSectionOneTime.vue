<template>
  <section class="py-16 lg:py-24">
    <div class="wrapper">
      <div
        v-motion-slide-visible-once-bottom
        class="bg-ink border-border relative overflow-hidden rounded-xl border"
      >
        <div
          aria-hidden="true"
          class="bg-sand/10 pointer-events-none absolute -bottom-48 -left-40 size-112 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          class="bg-primary/20 pointer-events-none absolute -top-48 -right-24 size-112 rounded-full blur-3xl"
        />

        <div
          class="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:p-16"
        >
          <div>
            <p
              v-motion-fade-visible-once
              :delay="150"
              class="text-primary text-xs font-semibold tracking-[0.25em] uppercase"
            >
              One-time passwords &amp; bank traffic
            </p>
            <h2
              v-motion-reveal
              :delay="250"
              class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
            >
              OTPs and bank alerts that land on every network.
            </h2>
            <p
              v-motion-fade-visible-once
              :delay="400"
              class="text-foreground/75 mt-5 max-w-xl text-base leading-relaxed text-pretty"
            >
              We have special pricing and an onboarding process for financial
              institutions and bank traffic, so your sender name is delivered on
              all networks whether or not the number is DND active.
            </p>

            <ul class="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              <li
                v-for="(point, index) in points"
                :key="point"
                v-motion-fade-visible-once
                :delay="500 + index * 75"
                class="flex items-center gap-3"
              >
                <span
                  class="bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full"
                >
                  <Check class="size-3.5" :stroke-width="3" />
                </span>
                {{ point }}
              </li>
            </ul>

            <div
              v-motion-fade-visible-once
              :delay="700"
              class="mt-10 flex flex-wrap gap-3"
            >
              <NuxtLink
                to="/contact-sales"
                class="bg-primary text-dark-blue hover:bg-primary/85 focus-visible:ring-primary/40 inline-flex h-12 items-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3"
              >
                Talk to sales
                <ArrowRight class="size-4" />
              </NuxtLink>
              <a
                href="mailto:support@multitexter.com"
                class="border-foreground/20 hover:bg-foreground/10 focus-visible:ring-primary/40 inline-flex h-12 items-center gap-2 rounded-lg border px-6 text-sm font-semibold transition-colors ease-in outline-none focus-visible:ring-3"
              >
                <Mail class="size-4" />
                support@multitexter.com
              </a>
            </div>
          </div>

          <div
            aria-hidden="true"
            class="mx-auto flex w-full max-w-sm flex-col items-start lg:mr-0"
          >
            <div
              v-for="(alert, index) in alerts"
              :key="alert.title"
              v-motion-slide-visible-once-bottom
              :delay="350 + index * 150"
              :class="['w-full', index > 0 && 'mt-3']"
            >
              <div
                :class="[
                  'border-border bg-surface/85 rounded-2xl border p-4 shadow-xl shadow-black/30 backdrop-blur',
                  index > 0 && 'origin-top scale-[0.96] opacity-70',
                ]"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="bg-sand text-charcoal flex size-9 shrink-0 items-center justify-center rounded-xl"
                  >
                    <component :is="alert.icon" class="size-4.5" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold tracking-wide">YOURBANK</p>
                    <p class="text-muted-foreground text-xs">
                      {{ alert.title }}
                    </p>
                  </div>
                  <span class="text-muted-foreground text-xs">
                    {{ alert.time }}
                  </span>
                </div>
                <p class="text-foreground/85 mt-3 text-sm leading-relaxed">
                  <template v-for="part in alert.message" :key="part.text">
                    <strong
                      v-if="part.strong"
                      class="text-foreground font-semibold tabular-nums"
                    >
                      {{ part.text }}
                    </strong>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </p>
              </div>
            </div>

            <p
              v-motion-pop-visible-once
              :delay="750"
              class="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400"
            >
              <CheckCheck class="size-3.5" />
              Delivered to a DND line in 2s
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Check,
  CheckCheck,
  KeyRound,
  Landmark,
  Mail,
} from '@lucide/vue'

const points = [
  'Delivery to DND-active numbers',
  'Priority routes on every network',
  'Special pricing for high volume',
  'Guided sender name onboarding',
]

const alerts = [
  {
    icon: KeyRound,
    title: 'One-time password',
    time: 'now',
    message: [
      { text: 'Your OTP is ' },
      { text: '482 913', strong: true },
      { text: '. It expires in 10 minutes. Never share it with anyone.' },
    ],
  },
  {
    icon: Landmark,
    title: 'Credit alert',
    time: '2m ago',
    message: [
      { text: 'Credit: ' },
      { text: 'NGN 25,000.00', strong: true },
      { text: ' received. Available balance: NGN 140,350.20.' },
    ],
  },
]
</script>
