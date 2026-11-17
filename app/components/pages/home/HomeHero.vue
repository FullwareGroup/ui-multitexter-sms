<template>
  <section class="relative overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-muted-foreground)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent)] bg-size-[24px_24px] opacity-25"
    />
    <div
      aria-hidden="true"
      class="bg-primary/15 pointer-events-none absolute -top-56 -right-32 size-144 rounded-full blur-3xl"
    />

    <div
      class="wrapper relative grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-24 xl:gap-20"
    >
      <div>
        <p
          v-motion-fade-visible-once
          class="border-border bg-surface/60 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur"
        >
          <span class="size-1.5 shrink-0 rounded-full bg-emerald-500" />
          Welcome to MultiTexter Bulk SMS
        </p>

        <h1
          v-motion-reveal
          :delay="100"
          class="mt-6 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
        >
          Send Bulk SMS.
          <span class="text-primary block">Save time, save money.</span>
        </h1>

        <p
          v-motion-fade-visible-once
          :delay="300"
          class="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Reach thousands of people on any network in Nigeria with one click, at
          one unit per SMS, with instant delivery reports.
        </p>
      </div>

      <div v-motion-slide-visible-once-right :delay="250">
        <HomeQuickCompose />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
