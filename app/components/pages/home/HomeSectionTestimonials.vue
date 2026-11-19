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

      <div
        v-motion-fade-visible-once
        :delay="350"
        class="marquee mt-12 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div class="marquee-track flex w-max">
          <ul
            v-for="copy in 2"
            :key="copy"
            :aria-hidden="copy === 2 || undefined"
            :class="['flex shrink-0 gap-4 pr-4', copy === 2 && 'marquee-copy']"
          >
            <li
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              class="bg-surface border-border flex w-80 shrink-0 rounded-xl border sm:w-96"
            >
              <div class="flex flex-1 flex-col p-6 sm:p-8">
                <div class="flex items-center justify-between gap-4">
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
                  <Quote aria-hidden="true" class="text-foreground/15 size-8" />
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
              </div>
            </li>
          </ul>
        </div>
      </div>
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

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-track {
  animation: marquee 70s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    overflow-x: auto;
  }

  .marquee-track {
    animation: none;
  }

  .marquee-copy {
    display: none;
  }
}
</style>
