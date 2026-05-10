<script setup lang="ts">
const props = defineProps<{ targetId?: string, label?: string }>()
const target = computed(() => props.targetId ?? 'about')
const label = computed(() => props.label ?? 'Skip to about')

function scroll() {
  if (typeof document === 'undefined') return
  const el = document.getElementById(target.value)
  if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 px-4 py-2 rounded bg-white text-black hover:bg-[var(--color-brand)] transition"
    @click="scroll"
  >
    <font-awesome-icon :icon="['fas', 'arrow-down']" />
    <span>{{ label }}</span>
    <font-awesome-icon :icon="['fas', 'arrow-down']" />
  </button>
</template>
