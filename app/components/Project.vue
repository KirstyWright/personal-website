<script setup lang="ts">
interface Project {
  name: string
  tags?: string[]
  description: string
  image?: string
}

defineProps<{ project: Project }>()
</script>

<template>
  <article class="bg-[var(--color-bg-card)] p-4 md:p-6 rounded mb-6">
    <div class="flex flex-col md:flex-row gap-4 md:gap-6">
      <NuxtImg
        v-if="project.image"
        :src="project.image"
        :alt="project.name"
        class="w-full md:w-48 h-auto rounded object-cover"
        format="webp"
      />
      <div class="flex-1">
        <div v-if="project.tags?.length" class="text-sm opacity-70 mb-1">
          <template v-for="(tag, i) in project.tags" :key="tag">{{ tag }}<span v-if="i + 1 < project.tags.length">, </span></template>
        </div>
        <h2 class="text-2xl font-semibold mb-2">{{ project.name }}</h2>
        <div class="prose prose-invert max-w-none" v-html="project.description" />
      </div>
    </div>
  </article>
</template>
