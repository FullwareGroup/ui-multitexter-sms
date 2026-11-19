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
            Our Clients
          </p>
          <h2
            v-motion-reveal
            :delay="100"
            class="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Trusted by brands Nigerians know.
          </h2>
        </div>
        <p
          v-motion-fade-visible-once
          :delay="300"
          class="text-muted-foreground max-w-md text-base leading-relaxed lg:pb-1"
        >
          Restaurants, universities, churches and fintechs send their alerts,
          offers and reminders with MultiTexter.
        </p>
      </div>

      <div
        v-motion-fade-visible-once
        :delay="350"
        class="marquee mt-12 overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div class="marquee-track flex w-max">
          <ul v-for="copy in 2" :key="copy" class="flex shrink-0 gap-4 pr-4">
            <li
              v-for="client in clients"
              :key="client.image"
              class="bg-sand flex h-20 w-32 shrink-0 items-center justify-center rounded-xl px-4 sm:h-24 sm:w-48"
            >
              <NuxtImg
                :src="`/images/${client.image}`"
                :alt="copy === 1 ? client.name : ''"
                class="h-12 w-auto max-w-full object-contain mix-blend-multiply sm:h-16"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Client {
  name: string
  image: string
}

const clients: Client[] = [
  { name: 'Burger King', image: 'burger-king.png' },
  { name: 'Loanbook', image: 'loan-book.jpeg' },
  { name: 'Covenant University', image: 'covenant.jpg' },
  { name: 'PrepClass', image: 'prep.png' },
  { name: 'BuyPower', image: 'buypowerng.jpg' },
  { name: 'The Redeemed Christian Church of God', image: 'rccg.png' },
  { name: 'Dodo Pizza', image: 'dodo-pizza.png' },
  { name: "Domino's Pizza", image: 'dominous.png' },
  { name: 'Blackbet', image: 'blackbelt.jpg' },
]
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
  animation: marquee 30s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}
</style>
