<template>
    <div>
        <section class="container" id='contact'>
            <Contact />
        </section>
    </div>
</template>

<script>

import Contact from '~/components/Contact.vue'

export default {
    layout:'page',
    components: {
        Contact,
    }
}
</script>
