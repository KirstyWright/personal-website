<template>
    <div>
        <section class="container" id='about'>
            <About />
        </section>
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
import ProjectsPreview from '~/components/ProjectsPreview.vue'

export default {
    components: {
        About,
        Interest,
        ProjectsPreview
    }
}
</script>
