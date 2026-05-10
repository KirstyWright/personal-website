<script setup lang="ts">
import ProjectListItem from './ProjectListItem.vue'

interface Project {
  name: string
  year: string
  blurb: string
  tags?: string[]
  href?: string
  expandable?: string
}

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <ul class="not-prose">
    <ProjectListItem
      v-for="p in projects"
      :key="p.name"
      :project="p"
    />
  </ul>
</template>
