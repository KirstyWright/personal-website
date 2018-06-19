<template lang="html">
    <div>
        <div class='text-center mb-4'><h1>Projects</h1></div>
        <div class="row mb-2">
            <Project v-for="p in projects" v-bind:key="p.name" v-bind:project="p"/>
        </div>
    </div>
</template>

<script>
import Project from '~/components/Project.vue'

export default {
    components: {
        Project
    },
    data: function () {
        return {
            projects: [
                {
                    name: 'Clevergirls',
                    description: `<p>
    Clevergirls is an online gaming community and news site dedicated to promoting and informing players about online games that interest its audience. Content includes articles, podcasts, streaming and a host of other features yet to be released. I worked as the sole developer on the project and was tasked with building both the front and backend of the site.
</p>
<p>
    The frontend was customer facing and displayed articles and other content that was written by authors on the site. The backend contained a simple system for content authors to write articles and upload content. This was then proof read by editors who would make edits before submitting the finished pieces to the site.
</p>
<ul>
    <li>Backend with multiple user levels.<ul>
        <li>Management of users and groups.</li>
        <li>Author interface to create and draft articles.</li>
        <li>Editor interface to edit and release articles.</li>
        <li>Streamer interface to schedule streams for display in the timetable.</li>
    </ul></li>
    <li>Tag system for filtering articles.</li>
    <li>Article categories to allow for podcasts and blogs.</li>
    <li>Streamer timetable with links to twitch and other streaming services.</li>
    <li>Commenting on articles with Disqus.</li>
</ul>`,
                    tags: [
                        'PHP',
                    ]
                },
                {
                    name: 'Safe-Scene',
                    description: ``,
                    tags: [
                        'PHP', 'Laravel'
                    ]
                },
                {
                    name: 'Polaris',
                    description: ``,
                    tags: [
                        'PHP', 'Laravel', 'Python'
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="css">
</style>
