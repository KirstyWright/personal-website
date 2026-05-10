<script setup lang="ts">
import HomeHero from '~/components/HomeHero.vue'
import SnapMedicFeature from '~/components/SnapMedicFeature.vue'
import SectionEyebrow from '~/components/SectionEyebrow.vue'
import ProjectList from '~/components/ProjectList.vue'
import InlineSocials from '~/components/InlineSocials.vue'

useHead({
  title: 'Kirsty Wright',
  meta: [
    { name: 'description', content: 'Kirsty Wright — paramedic with the London Ambulance Service and creator of SnapMedic.' }
  ]
})

const projects = [
  {
    name: 'CAD',
    year: '2022',
    blurb: 'Web-based computer-aided dispatch system for a FiveM-based roleplay community.',
    tags: ['Vue', 'PHP', 'WebSockets'],
    expandable: '<p>A Vue.js frontend with a PHP backend (Slim + Eloquent) on a MariaDB database. Designed to give 50+ concurrent users a live-updating management system, using websockets to push updates as information changed.</p><p>Currently closed source; an open version is on the cards.</p>'
  },
  {
    name: 'Screeps',
    year: '2021',
    blurb: 'A TypeScript bot for the JavaScript-driven RTS game Screeps. An adventure into long-running automation.',
    tags: ['TypeScript', 'Game'],
    href: 'https://github.com/KirstyWright/screepsAI',
    expandable: '<p>Screeps is an RTS powered by JavaScript code that runs in a constant loop. You write the bot, it plays the game. Mostly an excuse to learn TypeScript and think about long-lived state.</p>'
  },
  {
    name: 'Quiz',
    year: '2020',
    blurb: 'Tiny self-test quiz app built during ambulance driving training to drill road signs.',
    tags: ['Vue'],
    href: 'https://quiz.snapmedic.app'
  },
  {
    name: 'Clevergirls',
    year: '2017',
    blurb: 'An online gaming community and news site — articles, podcasts, streams, and a small editorial team.',
    tags: ['PHP', 'Vue'],
    expandable: '<p>Sole developer on both the editorial frontend and the backend tooling. Authors wrote articles, editors proofed them, streamers had their own timetable. Tag system, podcast support, Disqus comments — the standard small-publication kit, hand-built.</p>'
  },
  {
    name: 'Polaris',
    year: '2016',
    blurb: 'Automated intelligence relay for an EVE Online corporation, running across four Linux servers.',
    tags: ['Python', 'Discord bots'],
    expandable: '<p>Collected information from automated relays, EVE\'s SSO + REST APIs, and external sources. Discord bots surfaced what mattered when it mattered.</p>'
  }
]
</script>

<template>
  <div>
    <div class="mx-auto w-full max-w-3xl px-6">
      <HomeHero />
    </div>

    <SnapMedicFeature />

    <section
      id="also-built"
      class="mx-auto w-full max-w-3xl px-6 pt-16 md:pt-24"
    >
      <SectionEyebrow
        ordinal="02"
        label="Also built"
      />
      <h2 class="text-h1 mb-6 max-w-[20ch]">
        A few other things over the years.
      </h2>
      <p class="text-[var(--color-ink-soft)] mb-10 max-w-[58ch]">
        Selected work, professional and personal, in roughly reverse-chronological order. Click a row for more.
      </p>
      <ProjectList :projects="projects" />
    </section>

    <section class="mx-auto w-full max-w-3xl px-6 pt-16 md:pt-24">
      <SectionEyebrow
        ordinal="03"
        label="Elsewhere"
      />
      <InlineSocials />
    </section>
  </div>
</template>
