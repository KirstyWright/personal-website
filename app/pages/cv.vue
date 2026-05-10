<script setup lang="ts">
interface Role {
  title: string
  period: string
  logo?: string
  body?: string
}

useHead({
  title: 'CV - Kirsty Wright',
  meta: [{ name: 'description', content: 'CV for Kirsty Wright.' }]
})

const roles: Role[] = [
  {
    title: 'London Ambulance Service: Emergency Ambulance Crew',
    period: 'August 2019 - Current',
    logo: '/images/companies/las.png',
    body: `<p>I joined LAS as a Trainee Emergency Ambulance Crew in 2019 and spent my first 6 months in a classroom followed by 12 months responding as a 999 ambulance alongside a qualified EAC or a Paramedic.</p>
<p>Following my qualification in February 2020 I have worked with trainees myself and in late 2020, as part of the response to the COVID pandemic, I worked on a covid support line with a police officer responding to 999 calls as the sole clinician.</p>
<p>Each shift I attend to patients in a variety of settings and assess them before providing appropriate management ranging from direct PPCI pathways to referrals to primary care. Most patients I attend can be managed by myself but some require advanced clinical care, working as part of a multidisciplinary team in a high-pressure environment to provide the best medical care to multiple casualties or time-critical patients.</p>
<p>I am currently studying for my Paramedic Science degree whilst remaining employed with the trust.</p>`
  },
  {
    title: 'Feed it back: Software Engineer',
    period: 'January 2019 - August 2019',
    logo: '/images/companies/fib.png'
  },
  {
    title: 'Shelter UK: Backend Developer',
    period: 'April 2018 - December 2018',
    logo: '/images/companies/shelter.png',
    body: `<p>In my time at Shelter I was involved in everything from refactoring old code to dealing with a large amount of technical debt. My main focus was around a few internal API servers which provided the backbone of online services. One of my responsibilities was to reach feature parity with these new servers so we could decommission old and insecure infrastructure.</p>
<p>I was involved in a wide range of projects across all product teams including:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Automated scripts to bridge the gap between systems.</li>
  <li>Compiling data exports &amp; reports using Python.</li>
  <li>Building monitoring tools for internal &amp; external infrastructure.</li>
  <li>Developing internal APIs using Laravel &amp; Lumen.</li>
  <li>Helping design &amp; implement new systems.</li>
</ul>`
  },
  {
    title: 'Diverse Interactive: Full Stack Developer',
    period: 'January 2018 - March 2018',
    logo: '/images/companies/diverse.png',
    body: '<p>Most of my role consisted of building Laravel-based applications to help manage Apps and Systems. I also worked more with Linux servers and AWS cloud hosting.</p>'
  },
  {
    title: 'Mintedbox: Web Developer',
    period: 'July 2015 - December 2017',
    logo: '/images/companies/minted.png',
    body: `<p>I was initially employed alongside my apprenticeship and then stayed on as a full stack developer.</p>
<p>Whilst my role was full stack, my projects mainly consisted of websites requiring bespoke systems or admin interfaces. I gained experience building mobile apps via Cordova as well as PHP-based APIs to go with them. I built many sites from ecommerce sites with third-party inventory management integrations to booking systems for hotels.</p>`
  }
]

const volunteering: Role[] = [
  {
    title: 'St John Ambulance: Ambulance Technician',
    period: 'January 2020 - Current',
    body: '<p>After the BRC stopped its Event First Aid department, I along with many other volunteers moved across to St John Ambulance where I continue to volunteer my time to assist at events.</p>'
  },
  {
    title: 'British Red Cross: Medical volunteering',
    period: 'January 2018 - January 2020',
    body: '<p>I volunteered with the BRC before I joined the ambulance service at a wide variety of events and achieved several in-house qualifications in relation to resuscitation.</p>'
  }
]
</script>

<template>
  <div class="space-y-12">
    <About />

    <section>
      <h1 class="text-3xl font-bold text-center mb-6">Roles</h1>
      <article
        v-for="role in roles"
        :key="role.title"
        class="bg-[var(--color-bg-card)] p-4 md:p-6 rounded mb-6"
      >
        <div class="flex flex-col md:flex-row gap-4">
          <NuxtImg
            v-if="role.logo"
            :src="role.logo"
            :alt="role.title"
            class="w-[72px] h-[72px] flex-shrink-0 rounded bg-white p-1"
            width="72"
            height="72"
            format="webp"
          />
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-1">{{ role.title }}</h3>
            <div class="text-sm opacity-70 mb-3">{{ role.period }}</div>
            <div v-if="role.body" class="space-y-3" v-html="role.body" />
          </div>
        </div>
      </article>
    </section>

    <section id="projects">
      <Projects />
    </section>

    <section id="interests">
      <Interest />
    </section>

    <section>
      <h1 class="text-3xl font-bold text-center mb-6">Volunteering</h1>
      <article
        v-for="role in volunteering"
        :key="role.title"
        class="bg-[var(--color-bg-card)] p-4 md:p-6 rounded mb-6"
      >
        <h3 class="text-xl font-semibold mb-1">{{ role.title }}</h3>
        <div class="text-sm opacity-70 mb-3">{{ role.period }}</div>
        <div v-if="role.body" class="space-y-3" v-html="role.body" />
      </article>
    </section>
  </div>
</template>
