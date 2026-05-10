<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Personal Projects</h1>
    <div class="flex justify-center items-center">
      <NuxtLink to="/projects" class="flex flex-wrap items-center justify-center gap-3 no-underline hover:no-underline">
        <NuxtImg
          src="/images/projects/clevergirls.png"
          alt="Clevergirls project"
          class="max-w-[250px] h-auto rounded"
          format="webp"
        />
        <NuxtImg
          src="/images/projects/polaris.png"
          alt="Polaris project"
          class="max-w-[200px] h-auto rounded"
          format="webp"
        />
      </NuxtLink>
    </div>
  </div>
</template>
