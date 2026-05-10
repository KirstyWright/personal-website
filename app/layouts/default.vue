<script setup lang="ts">
const route = useRoute()
const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/cv', label: 'CV' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
]
const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

const open = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white text-gray-900 shadow-sm">
      <nav class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="font-semibold text-lg no-underline hover:no-underline hover:text-[var(--color-brand)]">
          Kirsty Wright
        </NuxtLink>
        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-gray-100"
          aria-label="Toggle navigation"
          @click="open = !open"
        >
          <span class="block w-5 h-0.5 bg-current mb-1" />
          <span class="block w-5 h-0.5 bg-current mb-1" />
          <span class="block w-5 h-0.5 bg-current" />
        </button>
        <ul class="hidden md:flex items-center gap-6">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="no-underline hover:no-underline hover:text-[var(--color-brand)]"
              :class="isActive(link.to) ? 'text-[var(--color-brand)] font-semibold' : ''"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <ul v-if="open" class="md:hidden border-t border-gray-100 px-4 py-2 space-y-2">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="block py-2 no-underline hover:no-underline hover:text-[var(--color-brand)]"
            :class="isActive(link.to) ? 'text-[var(--color-brand)] font-semibold' : ''"
            @click="open = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </header>

    <main class="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
      <slot />
    </main>

    <footer class="bg-gray-100 text-gray-600 mt-8">
      <div class="mx-auto max-w-6xl px-4 py-4 text-sm">
        Kirsty Wright | kirsty.dev
      </div>
    </footer>
  </div>
</template>
