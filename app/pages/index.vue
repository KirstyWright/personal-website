<script setup lang="ts">
useHead({
  title: 'Kirsty Wright',
  meta: [
    { name: 'description', content: "Kirsty Wright's personal website — software engineer, paramedic, hobbyist developer." }
  ]
})
</script>

<template>
  <div class="space-y-12">
    <Hero />

    <section id="about" class="space-y-4">
      <h2 class="text-3xl font-bold text-center">About</h2>
      <About />
    </section>

    <section id="social" class="space-y-4">
      <h2 class="text-3xl font-bold text-center">Social links</h2>
      <SocialLinks />
    </section>

    <section id="interests" class="space-y-4">
      <h2 class="text-3xl font-bold text-center">Skills &amp; software</h2>
      <Interest />
    </section>

    <section>
      <ProjectsPreview />
    </section>
  </div>
</template>
