<template>
  <section class="py-16 lg:py-24">
    <div class="wrapper">
      <div
        class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
      >
        <div class="max-w-3xl">
          <p
            v-motion-fade-visible-once
            class="text-primary text-xs font-semibold tracking-[0.25em] uppercase"
          >
            Testimonials
          </p>
          <h2
            v-motion-reveal
            :delay="100"
            class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            What our customers are saying.
          </h2>
        </div>
        <p
          v-motion-fade-visible-once
          :delay="300"
          class="text-muted-foreground max-w-md text-base leading-relaxed lg:pb-1"
        >
          Schools, churches, start-ups and shops rely on MultiTexter to reach
          their people on time.
        </p>
      </div>

      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <li
          v-motion-slide-visible-once-bottom
          class="bg-dark-blue relative overflow-hidden rounded-xl border border-white/10 text-white sm:col-span-2 lg:col-span-4"
        >
          <div
            aria-hidden="true"
            class="bg-primary/15 pointer-events-none absolute -top-40 -right-24 size-96 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -bottom-48 -left-32 size-112 rounded-full bg-teal-400/15 blur-3xl"
          />

          <figure class="relative flex h-full flex-col p-8 sm:p-10">
            <Quote aria-hidden="true" class="text-primary size-10" />
            <blockquote
              class="mt-6 text-xl leading-relaxed font-medium text-pretty sm:text-2xl"
            >
              <p>&ldquo;{{ featured.quote }}&rdquo;</p>
            </blockquote>
            <figcaption class="mt-auto flex items-center gap-4 pt-10">
              <span
                class="text-primary flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold"
              >
                {{ initials(featured.name) }}
              </span>
              <div>
                <p class="font-semibold">{{ featured.name }}</p>
                <p class="text-sm text-white/60">{{ featured.role }}</p>
              </div>
            </figcaption>
          </figure>
        </li>

        <li
          v-for="(testimonial, index) in rest"
          :key="testimonial.name"
          v-motion-slide-visible-once-bottom
          :delay="index === 0 ? 150 : (index - 1) * 100"
          class="bg-surface border-border rounded-xl border lg:col-span-2"
        >
          <figure class="flex h-full flex-col p-8">
            <div
              role="img"
              aria-label="Rated 5 out of 5"
              class="text-primary flex gap-1"
            >
              <Star
                v-for="star in 5"
                :key="star"
                aria-hidden="true"
                class="size-4 fill-current"
              />
            </div>
            <blockquote class="mt-6 text-base leading-relaxed">
              <p>&ldquo;{{ testimonial.quote }}&rdquo;</p>
            </blockquote>
            <figcaption class="mt-auto flex items-center gap-3 pt-8">
              <span
                class="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              >
                {{ initials(testimonial.name) }}
              </span>
              <div>
                <p class="text-sm font-semibold">{{ testimonial.name }}</p>
                <p class="text-muted-foreground text-sm">
                  {{ testimonial.role }}
                </p>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Quote, Star } from '@lucide/vue'

interface Testimonial {
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'We send fee reminders and result alerts to thousands of parents every term. Uploading the CSV takes a minute, and the delivery reports show us exactly who received each message.',
    name: 'Adaeze Okonkwo',
    role: 'Bursar, secondary school in Enugu',
  },
  {
    quote:
      'Our OTPs go out through the API and land in seconds, even on DND lines. Support had our sender ID approved the same week.',
    name: 'Ibrahim Musa',
    role: 'CTO, fintech start-up in Lagos',
  },
  {
    quote:
      'Scheduling changed our weekends. Service reminders go out on Saturday evening without anyone staying back to send them.',
    name: 'Grace Adebayo',
    role: 'Church administrator, Ibadan',
  },
  {
    quote:
      'One unit per SMS and no surprises. I top up by bank transfer and my units are ready before my next promo goes out.',
    name: 'Kelechi Eze',
    role: 'Owner, fashion store in Aba',
  },
  {
    quote:
      'We tried other providers before MultiTexter. This is the first one where customers actually tell us they got the message.',
    name: 'Folake Adeyemi',
    role: 'Marketing manager, restaurant chain in Abuja',
  },
]

const [featured, ...rest] = testimonials as [Testimonial, ...Testimonial[]]

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
</script>
