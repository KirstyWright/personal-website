<template>
    <div>
        <section class="container-fluid">
            <Console />
        </section>
        <section class="container">
            <Interest />
        </section>
    </div>
</template>

<script>

import Console from '~/components/Console.vue'
import Interest from '~/components/Interest.vue'

export default {
    components: {
        Console,
        Interest
    }
}
</script>
