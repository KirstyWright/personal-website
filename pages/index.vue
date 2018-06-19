<template>
    <div>
        <ScrollTo />
        <section class="container-fluid">
            <Console />
        </section>
        <section class="container">
            <Interest />
        </section>
        <section class="container" id='projects'>
            <Projects />
        </section>
    </div>
</template>

<script>

import ScrollTo from '~/components/ScrollTo.vue'
import Console from '~/components/Console.vue'
import Interest from '~/components/Interest.vue'
import Projects from '~/components/Projects.vue'

export default {
    components: {
        Console,
        Interest,
        ScrollTo,
        Projects
    }
}
</script>
