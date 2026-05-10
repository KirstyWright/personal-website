<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[var(--color-rule)] mt-24">
    <div class="mx-auto w-full max-w-3xl px-6 py-6 text-meta flex flex-wrap items-center gap-x-3 gap-y-1">
      <span>Kirsty Wright</span>
      <span aria-hidden="true">·</span>
      <a
        href="mailto:kirsty@kirsty.dev"
        class="no-underline text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        style="text-decoration: none;"
      >kirsty@kirsty.dev</a>
      <span aria-hidden="true">·</span>
      <span>{{ year }}</span>
    </div>
  </footer>
</template>
