<script setup lang="ts">
import IconArrowUpRight from './icons/IconArrowUpRight.vue'
import IconMail from './icons/IconMail.vue'
</script>

<template>
  <section class="pt-12 pb-12 md:pt-16 md:pb-16">
    <div class="text-meta flex items-center gap-2 mb-5">
      <span
        class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]"
        aria-hidden="true"
      />
      <span>Based in London</span>
    </div>

    <h1 class="text-h2 max-w-[58ch]">
      Paramedic in London, and maker of <a href="#snapmedic">SnapMedic</a> — a pocket toolkit for UK ambulance clinicians. Over 10,000 downloads, and growing.
    </h1>

    <div class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-meta">
      <a
        href="mailto:kirsty@kirsty.dev"
        class="inline-flex items-center gap-2 no-underline text-[var(--color-ink)] hover:text-[var(--color-ink)]"
        style="text-decoration: underline; text-decoration-color: var(--color-brand); text-underline-offset: 0.35em;"
      >
        <IconMail class="w-4 h-4" />
        <span>Email me</span>
      </a>
      <a
        href="#also-built"
        class="inline-flex items-center gap-2 no-underline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        style="text-decoration: none;"
      >
        <span>See projects</span>
        <IconArrowUpRight class="w-4 h-4" />
      </a>
      <NuxtLink
        to="/cv"
        class="inline-flex items-center gap-2 no-underline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        style="text-decoration: none;"
      >
        <span>Read CV</span>
        <IconArrowUpRight class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>
