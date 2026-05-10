<script setup lang="ts">
const links = [
  {
    href: 'https://twitter.com/KirstyWrightWeb',
    title: 'Twitter',
    body: 'Where I usually ramble about nonsense and occasionally talk about computers.',
    icon: ['fab', 'x-twitter'] as [string, string]
  },
  {
    href: 'https://github.com/KirstyWright/',
    title: 'GitHub',
    body: 'This is where I host my code, both public and private. Recent projects can be found here.',
    icon: ['fab', 'github'] as [string, string]
  },
  {
    href: 'https://codepen.io/kirstywright/',
    title: 'CodePen',
    body: 'Random snippets of frontend code or styles can be found here.',
    icon: ['fab', 'codepen'] as [string, string]
  },
  {
    href: 'https://www.linkedin.com/in/kirstywrightweb/',
    title: 'LinkedIn',
    body: 'My professional profile, including past roles and qualifications.',
    icon: ['fab', 'linkedin'] as [string, string]
  }
]
</script>

<template>
  <ul class="bg-[var(--color-bg-card)] divide-y divide-white/10">
    <li v-for="link in links" :key="link.href">
      <a
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 p-4 pr-20 relative no-underline hover:no-underline hover:bg-black/30 transition"
      >
        <div class="flex-1">
          <h3 class="text-xl font-semibold mb-1">{{ link.title }}</h3>
          <p class="text-sm opacity-80">{{ link.body }}</p>
        </div>
        <font-awesome-icon
          :icon="link.icon"
          class="absolute right-5 top-1/2 -translate-y-1/2 text-4xl md:text-5xl"
        />
      </a>
    </li>
  </ul>
</template>
