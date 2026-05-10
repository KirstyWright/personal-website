<script setup lang="ts">
const projects = [
  {
    name: 'CAD',
    tags: ['Vue.js', 'PHP', 'WebSockets'],
    description: `<p>CAD is a web-based computer-aided dispatch system for a FiveM-based roleplay community. It comprises a Vue.js frontend with a PHP backend (Slim + Eloquent) attached to a MariaDB database. It is designed to give upwards of 50 concurrent users a live-updating management system, using websockets to rapidly update users when information changes.</p><p>Whilst the code is currently closed source, I am looking at making an open version in the future.</p>`
  },
  {
    name: 'Screeps',
    tags: ['TypeScript', 'Game'],
    description: `<p>Screeps is an RTS game powered by JavaScript code that runs in a constant loop. Players use their JavaScript code to control little figures (screeps) in an attempt to fight other players, develop land and eventually form an empire (not that I got that far).</p><p>For me, Screeps was an adventure into building a JavaScript bot whilst learning TypeScript. The bot can be found <a href="https://github.com/KirstyWright/screepsAI" target="_blank" rel="noopener noreferrer">here</a>.</p>`
  },
  {
    name: 'Quiz',
    tags: ['Vue.js'],
    description: `<p>A simple quiz app that runs on Vue.js, developed during my driving course within the Ambulance service as a way to test ourselves on our road signs knowledge.</p><p>Code: <a href="https://github.com/KirstyWright/quiz" target="_blank" rel="noopener noreferrer">github.com/KirstyWright/quiz</a> · Live: <a href="https://quiz.kirsty.dev" target="_blank" rel="noopener noreferrer">quiz.kirsty.dev</a></p>`
  },
  {
    name: 'Clevergirls',
    tags: ['PHP', 'Vue.js'],
    image: '/images/projects/clevergirls.png',
    description: `<p>Clevergirls was an online gaming community and news site dedicated to promoting and informing players about online games. Content included articles, podcasts and streams. I worked as the sole developer on the project and was tasked with building both the frontend and backend.</p><p>The frontend displayed articles and other content. The backend contained a system for content authors to write articles and upload content, which was then proof-read by editors before submission.</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Backend with multiple user levels (management, authors, editors, streamers)</li><li>Tag system for filtering articles</li><li>Article categories supporting podcasts and blogs</li><li>Streamer timetable with links to Twitch and other services</li><li>Disqus comments on articles</li></ul>`
  },
  {
    name: 'Polaris',
    tags: ['Python', 'EVE Online'],
    image: '/images/projects/polaris.png',
    description: `<p>Polaris was an automated assistant for an intelligence network for the game EVE Online. It ran and collected information from automated relays and external sources.</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Management of 4 Linux servers</li><li>Desktop Python programs to collect specific log files</li><li>EVE single sign-on and REST API integration</li><li>Discord bots on a Python framework to output important information</li></ul>`
  }
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Personal Projects</h1>
    <Project v-for="p in projects" :key="p.name" :project="p" />
  </div>
</template>
