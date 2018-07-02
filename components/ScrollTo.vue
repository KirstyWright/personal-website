<template lang="html">
    <div class="scroll-down" v-show="show">
        <div id="js-scroll-down" class="scroll-down__arrow flex-md-row" v-on:click="scrollTo">
            <img class='scroll-down__arrow-image' src="~/assets/arrow_down.svg" alt="downward arrow">
            <span>Click to skip the past awesome console</span>
            <img class='scroll-down__arrow-image' src="~/assets/arrow_down.svg" alt="downward arrow">
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            show: ''
        }
    },
    mounted: function() {
        this.show = true;
        window.document.body.onscroll = () => {
            let element = document.getElementById('js-terminal');
            if (window.scrollY < (element.offsetTop + element.offsetHeight)) {
                this.show = true;
            } else {
                this.show = false;
            }
        }
    },
    methods: {
        scrollTo: function()
        {
            let target = document.getElementById('about')
            window.scrollTo(0,target.offsetTop);
        }
    }
}
</script>

<style lang="css">
    .scroll-down {
        position: fixed;
        bottom:0px;
        max-width:383px;
        min-height:50px;
        z-index:10;
        cursor:pointer;
        left:calc(50%-191px);
        background-color:white;
        color:black;
    }
    @media only screen and (max-width: 390px) {
        .scroll-down {
            width:100%;
            padding:5px 10px;
            left:0px;
            text-align: center;
        }
        .scroll-down__arrow-image {
            display:none;
        }
    }
    .scroll-down:hover {
        background-color:#34ca46;
    }
    .scroll-down__arrow-image{
        color: white;
    }
</style>
