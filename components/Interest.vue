<template lang="html">
    <div>
        <div class='interest__container'>
            <div class='justify-content-center d-flex flex-wrap'>
                <img class='icon-row__icon'
                v-for="language in languages"
                v-bind:key="language.name"
                v-bind:class="{'icon-row__icon--selected': selectedLanguage.name == language.name}"
                v-bind:src="language.logo"
                v-bind:alt="language.name"
                v-on:click="showLanguage(language)">
            </div>
            <div class="interest__explaination-container">
                <div v-if='selectedLanguage'>
                    <h4>{{selectedLanguage.name}}</h4>
                    <p v-html='selectedLanguage.content'></p>
                </div>
                <p class='mt-3 text-center icon-row__no-selection-text'  v-show='!selectedLanguage'>Above is a interactive list of some of the technologies I have worked with and my thoughts on them.</p>
                <p class='text-center icon-row__no-selection-text' v-show='!selectedLanguage'>Click an icon to read about it</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            selectedLanguage: false,
            languages: {
                php: {
                    name: 'PHP',
                    logo: require('~/assets/icons/php-original.svg'),
                    content: `I constantly find it interesting how polarised the dev community is on PHP as a language. Many seem to think of vunrable wordpress sites and badly arranged code when PHP comes to mind. I started my developer journey with PHP and it still is what the majority of my work runs on. As a language I accept it can sometimes be a bit quirky but I think that's why I enjoy working with it so much. PHP can most defintly be done wrong but equally it can be done very well especially with php7.`
                },
                laravel: {
                    name: 'Laravel',
                    logo: require('~/assets/icons/laravel-plain-wordmark.svg'),
                    content: 'Laravel & Lumen both make developing PHP MVCs much faster from the get go. The wide breadth of functions and features they bring to the table allow you to very quickly build applications which would otherwise take a long time to build the foundation. They do have some downsides of course but overall I enjoy using them both to build more complex PHP applications from APIs to more specialised projects like Polaris or Safe Scene.'
                },
                mysql: {
                    name: 'MySQL',
                    logo: require('~/assets/icons/mysql-original-wordmark.svg'),
                    content: 'A database is of course a core component in most forms of application. Almost all of my projects tend to use either Mysql or MariaDB as a data storage solution. For some of them I have looked at coupling them with Redis for caching which does of course improve response times but most of my projects do not require that speed.<br><br>MySql is a powerful language when used properly, I have seen horendusly expensive (timewise) queries which could be simplified in projects I have worked with before. It is very easy to just blame the software rather than looking into why some of your queries are slow and personally I enjoy the challenge of trying to optimise those queries.'
                },
                python: {
                    name: 'Python',
                    logo: require('~/assets/icons/python-original-wordmark.svg'),
                    content: 'Python is a wonderful language to use and I enjoy working with it when I get the chance. I tend to use it whenever I write a desktop program or need a small script to perform a task. For instance at Shelter I used Python alot for small scripts to extract and parse data from systems. Core components of Polaris also use Python to run applications both on Linux machines and compiled exe\'s on Windows boxes. Asynchronous Python is also alot of fun to write and I have enjoyed that when writing bots using Discord or Websockets. '
                },
                // ruby: {
                //     name: 'Ruby',
                //     logo: require('~/assets/icons/ruby-original-wordmark.svg')
                // },
                // vuejs: {
                //     name: 'VueJs',
                //     logo: require('~/assets/icons/vuejs-original-wordmark.svg'),
                // },
                // javascript: {
                //     name: 'Javascript',
                //     logo: require('~/assets/icons/javascript-original.svg')
                // },
                // html: {
                //     name: 'HTML',
                //     logo: require('~/assets/icons/html5-original-wordmark.svg')
                // },
                // apache: {
                //     name: 'Apache2',
                //     logo: require('~/assets/icons/apache-original-wordmark.svg')
                // },
                // vagrant: {
                //     name: 'Vagrant',
                //     logo: require('~/assets/icons/vagrant-original-wordmark.svg')
                // },
                // atom: {
                //     name: 'Atom',
                //     logo: require('~/assets/icons/atom-original-wordmark.svg'),
                //     content: "Atom is my go to editor for everything I work with. One of the main reasons I love it, is due to how much you can customise it, its designed for you to add what you want and tweak to your hearts content. My atom install runs with various ide plugins for php and python along with really useful bits of kit like Emmet, which makes typing HTML a breeze."
                // }
            }
        }
    },
    methods: {
        showLanguage: function(language) {
            this.selectedLanguage = language;
        }
    }
}
</script>

<style lang="css">
.interest__container {
    width: 100%;
    background-color: #fff;
    margin-bottom:20px;
    margin-top:20px;
}
.icon-row__icon {
    background-color: #fff;
    width:100px;
    display: block;
    padding:10px 10px;
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
    cursor:pointer;
}
.icon-row__icon--selected {
    border-right: 2px solid #ccc;
    border-left: 2px solid #ccc;
}
.interest__explaination-container {
    width:100%;
    border-top:1px solid #ccc;
    min-height:200px;
    color:#000;
    padding:10px;
}
.icon-row__no-selection-text {
}
</style>
