<script setup lang="ts">
import SectionEyebrow from '~/components/SectionEyebrow.vue'
import RoleEntry from '~/components/RoleEntry.vue'

interface Role {
  title: string
  period: string
  body?: string
}

useHead({
  title: 'CV — Kirsty Wright',
  meta: [
    { name: 'description', content: 'CV for Kirsty Wright — paramedic with the London Ambulance Service and creator of SnapMedic.' }
  ]
})

const experience: Role[] = [
  {
    title: 'SnapMedic — Creator',
    period: 'Jun 2025 → now',
    body: '<p>SnapMedic is a mobile and web application built for UK ambulance clinicians, covering clinical tools, ECG interpretation, OSCE practice, flashcards, and staff welfare resources. From zero to 10,000+ downloads.</p><p>As a solo founder I manage every part of the product — development, infrastructure, B2B partnerships and marketing — alongside full-time shift work as a paramedic.</p>'
  },
  {
    title: 'London Ambulance Service NHS Trust — Paramedic',
    period: 'Oct 2023 → now',
    body: '<p>Each shift I attend to patients in a variety of settings and assess them before providing appropriate management — from direct PPCI pathways to referrals to primary care. Most patients I attend can be managed by me alone, but some require advanced clinical care, working as part of a multidisciplinary team in a high-pressure environment for time-critical patients.</p>'
  },
  {
    title: 'London Ambulance Service NHS Trust — Student Paramedic',
    period: 'Oct 2021 → Oct 2023',
    body: '<p>Two-year work-based BSc programme at the University of Cumbria, completed alongside frontline shifts.</p>'
  },
  {
    title: 'London Ambulance Service NHS Trust — Emergency Medical Technician',
    period: 'Mar 2021 → Oct 2023',
    body: '<p>Qualified EMT working frontline 999 response in London. Followed qualification I worked with trainees myself and spent six months on the COVID support line, crewed with a police officer responding to 999 calls.</p>'
  },
  {
    title: 'London Ambulance Service NHS Trust — Trainee Emergency Ambulance Crew',
    period: 'Aug 2019 → Mar 2021',
    body: '<p>Six months in the classroom, then twelve months responding as a 999 ambulance alongside a qualified EAC or paramedic.</p>'
  },
  {
    title: 'Feed It Back — Software Engineer',
    period: 'Jan 2019 → Aug 2019'
  },
  {
    title: 'Shelter UK — Backend Developer',
    period: 'Apr 2018 → Dec 2018',
    body: '<p>Worked across product teams refactoring legacy code and building the internal APIs that backed Shelter\'s online services. Reaching feature parity with the new servers let us decommission older, less secure infrastructure.</p><ul class="list-disc pl-5 space-y-1"><li>Automation scripts to bridge disparate systems.</li><li>Data exports and reporting in Python.</li><li>Monitoring tools for internal and external infrastructure.</li><li>Internal APIs in Laravel and Lumen.</li></ul>'
  },
  {
    title: 'Minted Box — Web Developer',
    period: 'Jul 2015 → Dec 2017',
    body: '<p>Initially employed alongside my apprenticeship, then stayed on as a full-stack developer. Mostly bespoke websites with custom admin systems — ecommerce with third-party inventory integrations, hotel booking platforms, and mobile apps via Cordova with PHP APIs to match.</p>'
  }
]

const education: Role[] = [
  {
    title: 'University of Cumbria — BSc Paramedic Science',
    period: 'Oct 2021 → Oct 2023'
  },
  {
    title: 'QA Apprenticeships — Level 3 IT Apprenticeship, Computing',
    period: '2015 → 2016'
  },
  {
    title: 'Ashcombe Sixth Form — AS-Level Computing',
    period: '2014 → 2015'
  }
]

const volunteering: Role[] = [
  {
    title: 'St John Ambulance — Ambulance Technician',
    period: 'Jan 2020 → now',
    body: '<p>Moved across to St John Ambulance after the BRC closed its Event First Aid department, continuing to volunteer at events.</p>'
  },
  {
    title: 'British Red Cross — Medical volunteering',
    period: 'Jan 2018 → Jan 2020',
    body: '<p>Volunteered across a wide range of events and gained several in-house resuscitation qualifications before moving to LAS and St John.</p>'
  }
]
</script>

<template>
  <div class="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
    <SectionEyebrow label="CV" />
    <h1 class="text-h1 mb-8 max-w-[26ch]">
      Software, then ambulances, then both.
    </h1>
    <p class="text-lead mb-12 max-w-[60ch]">
      Former software engineer, now a paramedic with the London Ambulance Service. I founded <a
        href="https://snapmedic.app"
        target="_blank"
        rel="noopener noreferrer"
      >SnapMedic</a> in 2025 to bring both worlds together — clinical tools, ECG interpretation, OSCE practice, flashcards and welfare resources for UK ambulance clinicians.
    </p>

    <section class="mt-14">
      <SectionEyebrow
        ordinal="01"
        label="Experience"
      />
      <RoleEntry
        v-for="role in experience"
        :key="role.title"
        :role="role"
      />
    </section>

    <section class="mt-16">
      <SectionEyebrow
        ordinal="02"
        label="Education"
      />
      <RoleEntry
        v-for="role in education"
        :key="role.title"
        :role="role"
      />
    </section>

    <section class="mt-16">
      <SectionEyebrow
        ordinal="03"
        label="Volunteering"
      />
      <RoleEntry
        v-for="role in volunteering"
        :key="role.title"
        :role="role"
      />
    </section>
  </div>
</template>
