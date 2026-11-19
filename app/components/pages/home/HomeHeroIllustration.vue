<template>
  <div
    role="img"
    aria-label="One personalised SMS sent from MultiTexter to 12,480 contacts and delivered across MTN, Airtel, Glo and T2"
    class="@container relative mx-auto aspect-5/4 w-full max-w-2xl"
  >
    <div
      aria-hidden="true"
      class="bg-sand/10 pointer-events-none absolute top-1/5 -left-[5cqw] size-[45cqw] rounded-full blur-3xl"
    />

    <svg
      viewBox="0 0 500 400"
      fill="none"
      aria-hidden="true"
      class="absolute inset-0 size-full"
    >
      <g class="text-foreground" stroke="currentColor" stroke-width="1.5">
        <circle :cx="hub.x" :cy="hub.y" r="52" stroke-opacity="0.08" />
        <circle :cx="hub.x" :cy="hub.y" r="86" stroke-opacity="0.05" />
        <path :d="`M180 ${hub.y}H${hub.x}`" stroke-opacity="0.2" />
        <path
          v-for="network in networks"
          :key="network.name"
          :d="network.path"
          stroke-opacity="0.22"
          stroke-dasharray="3 5"
          stroke-linecap="round"
        />
      </g>
      <g class="fill-primary motion-reduce:hidden">
        <circle
          v-for="(network, index) in networks"
          :key="network.name"
          r="3.5"
          opacity="0"
        >
          <animateMotion
            :path="network.path"
            dur="2.4s"
            :begin="`${index * -0.6}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.8;1"
            dur="2.4s"
            :begin="`${index * -0.6}s`"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

    <div
      class="border-border bg-ink absolute top-[7.5%] left-[4%] h-[85%] w-[32%] rounded-[5.6cqw] border p-[1.2cqw] shadow-2xl shadow-black/40"
    >
      <div
        class="bg-surface flex h-full flex-col rounded-[4.4cqw] px-[2.4cqw] pt-[2cqw] pb-[2.4cqw]"
      >
        <span
          class="bg-foreground/15 mx-auto h-[1.2cqw] w-[9cqw] rounded-full"
        />

        <div class="mt-[3cqw] flex items-center gap-[1.6cqw]">
          <span
            class="bg-sand text-charcoal flex size-[6cqw] shrink-0 items-center justify-center rounded-full text-[2.2cqw] font-bold"
          >
            MT
          </span>
          <div class="min-w-0">
            <p class="truncate text-[2.6cqw] leading-tight font-semibold">
              MultiTexter
            </p>
            <p class="text-muted-foreground text-[2cqw] leading-tight">
              Sender ID
            </p>
          </div>
        </div>

        <div
          class="border-border bg-background mt-[2.4cqw] rounded-[1.6cqw] border px-[1.8cqw] py-[1.6cqw]"
        >
          <p class="text-muted-foreground text-[2cqw] leading-tight">
            Recipients
          </p>
          <p
            class="mt-[0.6cqw] flex items-center gap-[1cqw] text-[3cqw] leading-tight font-semibold tabular-nums"
          >
            <Users class="text-primary size-[3cqw] shrink-0" />
            12,480
          </p>
        </div>

        <p
          class="bg-sand text-charcoal mt-[2.4cqw] rounded-[2.4cqw] rounded-bl-[0.8cqw] px-[2.2cqw] py-[1.8cqw] text-[2.6cqw] leading-snug"
        >
          Hi Ada, your order #2041 is on its way.
        </p>
        <p
          class="text-muted-foreground mt-[1.2cqw] text-right text-[2cqw] leading-tight tabular-nums"
        >
          39 characters · 1 page
        </p>

        <div
          class="border-border mt-auto flex items-center justify-between border-t pt-[2cqw] text-[2.2cqw] leading-tight"
        >
          Delivery report
          <span
            class="bg-primary flex h-[3.2cqw] w-[5.6cqw] rounded-full p-[0.4cqw]"
          >
            <span
              class="bg-dark-blue ml-auto aspect-square h-full rounded-full"
            />
          </span>
        </div>

        <span
          class="bg-primary text-dark-blue mt-[2cqw] flex h-[7.2cqw] items-center justify-center gap-[1.2cqw] rounded-[1.6cqw] text-[2.6cqw] font-semibold"
        >
          <Send class="size-[2.8cqw]" />
          Send now
        </span>
      </div>
    </div>

    <div class="absolute top-[51.25%] left-[43%] size-[8cqw] -translate-1/2">
      <span
        class="bg-primary/40 absolute inset-0 rounded-full motion-safe:animate-ping"
      />
      <span
        class="bg-primary text-dark-blue ring-primary/15 relative flex size-full items-center justify-center rounded-full ring-[1.6cqw]"
      >
        <Send class="size-[3.6cqw]" />
      </span>
    </div>

    <div
      v-for="(network, index) in networks"
      :key="network.name"
      v-motion-pop-visible-once
      :delay="450 + index * 100"
      class="border-border bg-surface absolute left-[66%] flex h-[16%] w-[32%] items-center gap-[2cqw] rounded-[2.4cqw] border px-[2.4cqw] shadow-lg shadow-black/30"
      :style="{ top: network.top }"
    >
      <div class="min-w-0 flex-1">
        <p class="text-[3cqw] leading-tight font-semibold">
          {{ network.name }}
        </p>
        <p
          class="text-muted-foreground mt-[0.6cqw] text-[2.2cqw] leading-tight tabular-nums"
        >
          {{ network.delivered }} delivered
        </p>
      </div>
      <span
        class="flex size-[5.6cqw] shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400"
      >
        <CheckCheck class="size-[3cqw]" />
      </span>
    </div>

    <div
      v-motion-pop-visible-once
      :delay="900"
      class="absolute top-[1.5%] left-[30%]"
    >
      <div
        class="float border-border bg-surface/90 flex items-center gap-[1.6cqw] rounded-[2.4cqw] border py-[1.6cqw] pr-[3cqw] pl-[1.6cqw] shadow-xl shadow-black/30 backdrop-blur"
      >
        <span
          class="flex size-[6cqw] items-center justify-center rounded-[1.6cqw] bg-emerald-500/15 text-emerald-400"
        >
          <CircleCheck class="size-[3.2cqw]" />
        </span>
        <div>
          <p class="text-[3.2cqw] leading-none font-semibold tabular-nums">
            99.8%
          </p>
          <p class="text-muted-foreground mt-[0.8cqw] text-[2cqw] leading-none">
            Delivery rate
          </p>
        </div>
      </div>
    </div>

    <div
      v-motion-pop-visible-once
      :delay="1000"
      class="absolute bottom-[2%] left-[24%]"
    >
      <div
        class="float float-late border-border bg-surface/90 flex items-center gap-[1.6cqw] rounded-[2.4cqw] border py-[1.6cqw] pr-[3cqw] pl-[1.6cqw] shadow-xl shadow-black/30 backdrop-blur"
      >
        <span
          class="bg-primary/15 text-primary flex size-[6cqw] items-center justify-center rounded-[1.6cqw]"
        >
          <Zap class="size-[3.2cqw]" />
        </span>
        <div>
          <p class="text-[3.2cqw] leading-none font-semibold">&lt; 3s</p>
          <p class="text-muted-foreground mt-[0.8cqw] text-[2cqw] leading-none">
            Avg. delivery
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCheck, CircleCheck, Send, Users, Zap } from '@lucide/vue'

const hub = { x: 215, y: 205 }

const networks = [
  { name: 'MTN', delivered: '5,132', y: 70 },
  { name: 'Airtel', delivered: '3,406', y: 160 },
  { name: 'Glo', delivered: '2,218', y: 250 },
  { name: 'T2', delivered: '1,724', y: 340 },
].map((network) => ({
  ...network,
  top: `${((network.y - 32) / 400) * 100}%`,
  path: `M${hub.x + 20} ${hub.y}C${hub.x + 70} ${hub.y} ${hub.x + 65} ${network.y} 330 ${network.y}`,
}))
</script>

<style scoped>
@keyframes float {
  50% {
    translate: 0 -1.6cqw;
  }
}

.float {
  animation: float 6s ease-in-out infinite;
}

.float-late {
  animation-delay: -3s;
}

@media (prefers-reduced-motion: reduce) {
  .float {
    animation: none;
  }
}
</style>
