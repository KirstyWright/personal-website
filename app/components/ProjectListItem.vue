<script setup lang="ts">
import IconArrowUpRight from './icons/IconArrowUpRight.vue'

interface Project {
  name: string
  year: string
  blurb: string
  tags?: string[]
  href?: string
  expandable?: string
}

defineProps<{ project: Project }>()
</script>

<template>
  <li class="border-t border-[var(--color-rule)] last:border-b">
    <component
      :is="project.expandable ? 'details' : 'div'"
      class="group block py-6"
    >
      <component
        :is="project.expandable ? 'summary' : 'div'"
        class="grid gap-2 md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-8 cursor-default list-none"
        :class="project.expandable ? 'cursor-pointer' : ''"
      >
        <span class="text-meta">{{ project.year }}</span>
        <div class="space-y-1">
          <div class="flex items-baseline gap-3">
            <h3 class="font-display text-[1.5rem] leading-tight">
              {{ project.name }}
            </h3>
            <a
              v-if="project.href"
              :href="project.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              style="text-decoration: none;"
              :aria-label="`Visit ${project.name}`"
            >
              <IconArrowUpRight class="w-4 h-4" />
            </a>
          </div>
          <p class="text-[var(--color-ink-soft)]">
            {{ project.blurb }}
          </p>
        </div>
        <span
          v-if="project.tags?.length"
          class="text-meta md:text-right md:max-w-[14rem]"
        >
          <template
            v-for="(tag, i) in project.tags"
            :key="tag"
          >{{ tag }}<span
            v-if="i + 1 < project.tags.length"
            aria-hidden="true"
          > · </span></template>
        </span>
      </component>
      <div
        v-if="project.expandable"
        class="mt-4 md:ml-[calc(5rem+2rem)] max-w-[60ch] text-[var(--color-ink-soft)] space-y-3"
        v-html="project.expandable"
      />
    </component>
  </li>
</template>
