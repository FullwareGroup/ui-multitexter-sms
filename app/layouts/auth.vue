<template>
  <div class="theme-brand bg-background text-foreground min-h-dvh sm:h-dvh">
    <div
      class="grid h-full min-h-dvh grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-2 md:grid-rows-none"
    >
      <aside
        class="bg-ink border-border relative isolate flex items-center justify-center overflow-hidden border-b py-8 md:border-r md:border-b-0 md:py-0"
      >
        <div
          aria-hidden="true"
          class="from-sand/6 pointer-events-none absolute inset-0 -z-10 bg-linear-to-br via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgb(216_203_179/0.16)_1px,transparent_1.5px)] mask-[radial-gradient(ellipse_at_center,black_25%,transparent_80%)] bg-size-[22px_22px]"
        />
        <div
          aria-hidden="true"
          class="bg-primary/20 pointer-events-none absolute -top-48 -left-48 -z-10 size-128 rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          class="bg-sand/10 pointer-events-none absolute -right-40 -bottom-56 -z-10 size-128 rounded-full blur-3xl"
        />
        <div
          v-for="line in lines"
          :key="line"
          aria-hidden="true"
          :class="[
            'from-primary/40 pointer-events-none absolute -z-10 hidden h-px to-transparent md:block',
            line,
          ]"
        />

        <div class="max-w-md px-6 text-center md:px-10">
          <AppLogo class="inline-block" />

          <p
            class="mt-5 text-lg leading-tight font-semibold tracking-tight text-balance md:mt-10 md:text-3xl xl:text-4xl"
          >
            One message, thousands reached.
            <span class="text-primary block">Every network in Nigeria.</span>
          </p>

          <p
            class="text-muted-foreground mt-5 hidden leading-relaxed text-pretty md:block"
          >
            Send your bulk sms message, with instant delivery reports on every
            send.
          </p>
        </div>
      </aside>

      <div class="flex h-full flex-col items-center justify-center">
        <div class="wrapper">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lines = [
  'top-[18%] right-0 w-2/5 bg-linear-to-l',
  'top-1/2 left-0 w-1/3 bg-linear-to-r',
  'top-[66%] right-0 w-1/2 bg-linear-to-l',
]
</script>
