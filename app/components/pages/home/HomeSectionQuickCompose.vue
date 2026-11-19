<template>
  <section class="relative overflow-hidden py-16 lg:py-24">
    <div
      aria-hidden="true"
      class="bg-primary/10 pointer-events-none absolute -right-32 -bottom-48 size-144 rounded-full blur-3xl"
    />

    <div
      class="wrapper relative grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
    >
      <div>
        <p
          v-motion-fade-visible-once
          class="text-primary text-xs font-semibold tracking-[0.25em] uppercase"
        >
          Quick Compose
        </p>
        <h2
          v-motion-reveal
          :delay="100"
          class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Write your first SMS before you even sign up.
        </h2>
        <p
          v-motion-fade-visible-once
          :delay="300"
          class="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed"
        >
          Type a sender name, the numbers and your message right here. When you
          log in, it's waiting on the compose page, ready to send.
        </p>

        <ol class="mt-10 space-y-6">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            v-motion-slide-visible-once-bottom
            :delay="400 + index * 100"
            class="relative flex gap-4"
          >
            <span
              v-if="index < steps.length - 1"
              aria-hidden="true"
              class="bg-border absolute top-11 -bottom-6 left-5.5 w-px"
            />
            <span
              class="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl"
            >
              <component :is="step.icon" class="size-5" />
            </span>
            <div class="pt-0.5">
              <h3 class="font-semibold">{{ step.title }}</h3>
              <p
                class="text-muted-foreground mt-1 text-sm leading-relaxed text-pretty"
              >
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div v-motion-slide-visible-once-bottom :delay="200">
        <QuickCompose />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PenLine, Send, UserRound } from '@lucide/vue'

const steps = [
  {
    icon: PenLine,
    title: 'Write your message',
    description:
      'Add a sender name, numbers and your message. We keep it on this device.',
  },
  {
    icon: UserRound,
    title: 'Sign up or log in',
    description: 'Create an account, or log in if you already have one.',
  },
  {
    icon: Send,
    title: 'Send from your dashboard',
    description: 'Your message is filled in on the compose page, ready to go.',
  },
]
</script>
