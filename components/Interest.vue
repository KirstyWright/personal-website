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

                </div>
                <h3 class='text-center icon-row__no-selection-text' v-show='!selectedLanguage'>Click an icon above</h3>
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
                    logo: require('~/assets/icons/php/php-original.svg')
                },
                laravel: {
                    name: 'Laravel',
                    logo: require('~/assets/icons/laravel/laravel-plain-wordmark.svg')
                },
                mysql: {
                    name: 'MySQL',
                    logo: require('~/assets/icons/mysql/mysql-original-wordmark.svg')
                },
                python: {
                    name: 'Python',
                    logo: require('~/assets/icons/python/python-original-wordmark.svg')
                },
                ruby: {
                    name: 'Ruby',
                    logo: require('~/assets/icons/ruby/ruby-original-wordmark.svg')
                },
                vuejs: {
                    name: 'VueJs',
                    logo: require('~/assets/icons/vuejs/vuejs-original-wordmark.svg')
                },
                javascript: {
                    name: 'Javascript',
                    logo: require('~/assets/icons/javascript/javascript-original.svg')
                },
                html: {
                    name: 'HTML',
                    logo: require('~/assets/icons/html5/html5-original-wordmark.svg')
                },
                apache: {
                    name: 'Apache2',
                    logo: require('~/assets/icons/apache/apache-original-wordmark.svg')
                },
                vagrant: {
                    name: 'Vagrant',
                    logo: require('~/assets/icons/vagrant/vagrant-original-wordmark.svg')
                },
                atom: {
                    name: 'Atom',
                    logo: require('~/assets/icons/atom/atom-original-wordmark.svg')
                }
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
    cursor:pointer;
}
.icon-row__icon--selected {
    padding:10px 6px;
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
    line-height: 150px;
}
</style>
