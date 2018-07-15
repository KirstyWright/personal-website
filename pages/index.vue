<template>
    <div>
        <ScrollTo />
        <section class="container-fluid">
            <Console />
        </section>
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

import ScrollTo from '~/components/ScrollTo.vue'
import About from '~/components/About.vue'
import Console from '~/components/Console.vue'
import Interest from '~/components/Interest.vue'
import ProjectsPreview from '~/components/ProjectsPreview.vue'

export default {
    components: {
        About,
        Console,
        Interest,
        ScrollTo,
        ProjectsPreview
    }
}
</script>
