<script setup lang="ts">
useHead({
  title: 'Blog - Kirsty Wright',
  meta: [{ name: 'description', content: 'Posts and ramblings from Kirsty Wright.' }]
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold mb-4">Blog</h1>
    <p v-if="!posts?.length" class="opacity-70">No posts yet. Check back soon.</p>
    <ul v-else class="space-y-4">
      <li v-for="post in posts" :key="post.path" class="bg-[var(--color-bg-card)] p-4 md:p-6 rounded">
        <NuxtLink :to="post.path" class="no-underline hover:no-underline block">
          <h2 class="text-2xl font-semibold mb-1 hover:text-[var(--color-brand)] transition">{{ post.title }}</h2>
          <div v-if="post.date" class="text-sm opacity-70">{{ post.date }}</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
