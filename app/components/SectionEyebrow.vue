<script setup lang="ts">
defineProps<{
  ordinal?: string
  label: string
}>()
</script>

<template>
  <div class="text-meta flex items-center gap-2 mb-6">
    <span aria-hidden="true">—</span>
    <span
      v-if="ordinal"
      class="text-[var(--color-ink-soft)]"
    >{{ ordinal }}</span>
    <span
      v-if="ordinal"
      aria-hidden="true"
    >/</span>
    <span>{{ label }}</span>
  </div>
</template>
