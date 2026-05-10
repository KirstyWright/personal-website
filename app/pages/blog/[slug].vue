<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useHead({
  title: `${post.value.title} - Kirsty Wright`,
  meta: post.value.description ? [{ name: 'description', content: post.value.description }] : []
})
</script>

<template>
  <article v-if="post" class="bg-[var(--color-bg-card)] p-4 md:p-8 rounded">
    <header class="mb-6">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ post.title }}</h1>
      <div v-if="post.date" class="text-sm opacity-70">{{ post.date }}</div>
    </header>
    <ContentRenderer :value="post" class="prose prose-invert max-w-none" />
  </article>
</template>
