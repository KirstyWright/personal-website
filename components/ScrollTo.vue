<template lang="html">
    <div class="scroll-down">
        <div class="scroll-down__arrow" v-on:click="scrollTo">click</div>
    </div>
</template>

<script>
export default {
    methods: {
        scrollTo: function()
        {
            let target = document.getElementById('projects')
            window.scrollTo(0,target.offsetTop);
        }
    }
}
</script>

<style lang="css">
    .scroll-down {
        position: fixed;
        bottom:0px;
        width:50px;
        height:50px;
        z-index:10;
        cursor:pointer;
        left:calc(50%-25px)
    }
</style>
