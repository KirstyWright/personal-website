<script setup lang="ts">
interface Role {
  title: string
  period: string
  body?: string
}

defineProps<{ role: Role }>()
</script>

<template>
  <article class="border-t border-[var(--color-rule)] last:border-b py-7 grid gap-3 md:grid-cols-[10rem_1fr] md:gap-10">
    <div class="text-meta md:pt-1">
      {{ role.period }}
    </div>
    <div>
      <h3 class="font-display text-[1.375rem] leading-tight">
        {{ role.title }}
      </h3>
      <div
        v-if="role.body"
        class="mt-3 space-y-3 text-[var(--color-ink-soft)] max-w-[60ch]"
        v-html="role.body"
      />
    </div>
  </article>
</template>
