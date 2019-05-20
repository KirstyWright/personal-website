<template>
    <div>
        <h1 class='text-center'>Welcome</h1>
        <section class="container" id='about'>
            <About />
        </section>
        <h1 class='text-center'>Social links</h1>
        <section class="container" id='social'>
            <SocialLinks />
        </section>
        <h1 class='text-center'>Skills &amp; software</h1>
        <section class="container">
            <Interest />
        </section>
        <section class="container">
            <ProjectsPreview />
        </section>
    </div>
</template>

<script>

import About from '~/components/About.vue'
import Interest from '~/components/Interest.vue'
import SocialLinks from '~/components/SocialLinks.vue'
import ProjectsPreview from '~/components/ProjectsPreview.vue'

export default {
    components: {
        About,
        SocialLinks,
        Interest,
        ProjectsPreview
    }
}
</script>
