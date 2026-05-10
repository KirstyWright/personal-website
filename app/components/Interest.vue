<script setup lang="ts">
interface Language {
  name: string
  logo: string
  content: string
}

const languages: Record<string, Language> = {
  php: {
    name: 'PHP',
    logo: '/images/icons/php-original.svg',
    content: `I constantly find it interesting how polarised the dev community is on PHP as a language. Many seem to think of vulnerable WordPress sites and badly arranged code when PHP comes to mind. I started my developer journey with PHP and it still is what the majority of my work runs on. As a language I accept it can sometimes be a bit quirky but I think that's why I enjoy working with it so much. PHP can most definitely be done wrong but equally it can be done very well.`
  },
  laravel: {
    name: 'Laravel',
    logo: '/images/icons/laravel-plain-wordmark.svg',
    content: 'Laravel & Lumen both make developing PHP MVCs much faster from the get go. The wide breadth of functions and features they bring to the table allow you to very quickly build applications which would otherwise take a long time to build the foundation. They do have some downsides of course but overall I enjoy using them both to build more complex PHP applications from APIs to more specialised projects.'
  },
  mysql: {
    name: 'MySQL',
    logo: '/images/icons/mysql-original-wordmark.svg',
    content: 'A database is a core component in most forms of application. Almost all of my projects tend to use either MySQL or MariaDB as a data storage solution. For some I have looked at coupling them with Redis for caching, which improves response times. MySQL is a powerful language when used properly — I have seen horrendously expensive queries which could be simplified, and I enjoy the challenge of optimising them.'
  },
  python: {
    name: 'Python',
    logo: '/images/icons/python-original-wordmark.svg',
    content: 'Python is a wonderful language to use and I enjoy working with it when I get the chance. I tend to use it whenever I write a desktop program or need a small script to perform a task. Asynchronous Python is also a lot of fun to write and I have enjoyed that when writing bots using Discord or WebSockets.'
  },
  vuejs: {
    name: 'Vue.js',
    logo: '/images/icons/vuejs-original-wordmark.svg',
    content: `Vue.js is something I now use quite a lot, as I don't need any complex setup or to completely change the way a frontend works. The components can be really lightweight and only used when I need extra functionality on an element, or they can make up an entire site. The ability to add a single component to an existing frontend speeds up development time as I am not faffing around with huge amounts of setup.`
  }
}

const selected = ref<Language | null>(null)
function show(lang: Language) {
  selected.value = lang
}
</script>

<template>
  <div class="bg-white text-gray-900 my-6 rounded">
    <div class="flex flex-wrap justify-center p-3 border-b border-gray-200">
      <button
        v-for="lang in languages"
        :key="lang.name"
        type="button"
        class="w-24 p-2 mx-1 cursor-pointer border-x-2 border-transparent transition"
        :class="selected?.name === lang.name ? 'border-x-gray-300' : ''"
        @click="show(lang)"
      >
        <img :src="lang.logo" :alt="lang.name" class="w-full h-auto">
      </button>
    </div>
    <div class="min-h-[200px] p-4">
      <div v-if="selected">
        <h4 class="text-xl font-semibold mb-2">{{ selected.name }}</h4>
        <p>{{ selected.content }}</p>
      </div>
      <div v-else class="text-center mt-3 space-y-2">
        <p>Above is an interactive list of some of the technologies I have worked with and my thoughts on them.</p>
        <p>Click an icon to read about it.</p>
      </div>
    </div>
  </div>
</template>
