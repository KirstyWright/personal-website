<script setup lang="ts">
import { STATUS_STYLE, type Status } from '~/data/b5parking'

const props = defineProps<{ status: Status }>()
const style = computed(() => STATUS_STYLE[props.status])
</script>

<template>
  <svg
    class="line-key"
    width="28"
    height="10"
    viewBox="0 0 28 10"
    aria-hidden="true"
    focusable="false"
  >
    <line
      x1="2"
      y1="5"
      x2="26"
      y2="5"
      :stroke="style.colour"
      stroke-width="4"
      stroke-linecap="round"
      :stroke-dasharray="style.dash ?? undefined"
    />
  </svg>
</template>

<style>
.line-key {
  flex: none;
  display: block;
}
</style>
