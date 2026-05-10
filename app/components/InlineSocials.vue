<script setup lang="ts">
import IconGitHub from './icons/IconGitHub.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconX from './icons/IconX.vue'
import IconCodePen from './icons/IconCodePen.vue'

const links = [
  { href: 'https://github.com/KirstyWright/', label: 'GitHub', icon: IconGitHub },
  { href: 'https://www.linkedin.com/in/kirstywrightweb/', label: 'LinkedIn', icon: IconLinkedIn },
  { href: 'https://twitter.com/KirstyWrightWeb', label: 'X (Twitter)', icon: IconX },
  { href: 'https://codepen.io/kirstywright/', label: 'CodePen', icon: IconCodePen }
]
</script>

<template>
  <ul class="flex flex-wrap items-center gap-x-8 gap-y-3 text-meta">
    <li
      v-for="link in links"
      :key="link.href"
    >
      <a
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 no-underline text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
        style="text-decoration: none;"
      >
        <component
          :is="link.icon"
          class="w-4 h-4"
        />
        <span>{{ link.label }}</span>
      </a>
    </li>
  </ul>
</template>
