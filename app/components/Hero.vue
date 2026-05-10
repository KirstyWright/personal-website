<template>
  <section class="py-12 md:py-20 text-center">
    <p class="text-sm uppercase tracking-widest text-[var(--color-brand)] mb-3">Hello there</p>
    <h1 class="text-4xl md:text-6xl font-bold mb-4">
      I'm Kirsty Wright
    </h1>
    <p class="max-w-2xl mx-auto text-lg text-gray-200">
      Software engineer turned ambulance clinician. Still building, still learning — just with a different kind of patient now.
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center px-5 py-2.5 rounded bg-[var(--color-brand)] text-black font-semibold no-underline hover:no-underline hover:bg-white transition"
      >
        See my projects
      </NuxtLink>
      <NuxtLink
        to="/cv"
        class="inline-flex items-center px-5 py-2.5 rounded border border-white/30 no-underline hover:no-underline hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition"
      >
        Read my CV
      </NuxtLink>
    </div>
  </section>
</template>
