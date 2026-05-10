<script setup lang="ts">
const route = useRoute()

const links = [
  { to: '/cv', label: 'CV' }
]

const isActive = (to: string) => route.path.startsWith(to)
</script>

<template>
  <header class="border-b border-[var(--color-rule)]">
    <nav class="mx-auto w-full max-w-3xl px-6 py-5 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-display text-lg no-underline"
        style="text-decoration: none;"
      >
        Kirsty Wright
      </NuxtLink>
      <ul class="flex items-center gap-6 text-meta">
        <li
          v-for="link in links"
          :key="link.to"
        >
          <NuxtLink
            :to="link.to"
            class="no-underline"
            :class="isActive(link.to) ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'"
            style="text-decoration: none;"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li>
          <a
            href="mailto:kirsty@kirsty.dev"
            class="no-underline text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            style="text-decoration: none;"
          >
            Email
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
