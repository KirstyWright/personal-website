<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light mb-3">
            <a class="navbar-brand" href="#">Kirsty Wright</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbarSm">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="collapsingNavbarSm">
                <ul class="navbar-nav  mr-auto">
                    <li class="nav-item" v-bind:class="{'active': $nuxt.$route.name == 'index'}">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item" v-bind:class="{'active': $nuxt.$route.name == 'projects'}">
                        <a class="nav-link" href="/projects" >Projects</a>
                    </li>
                    <li class="nav-item" v-bind:class="{'active': $nuxt.$route.name == 'contact'}">
                        <a class="nav-link" href="/contact">Contact me</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item" v-bind:class="{'active': $nuxt.$route.name == 'cv'}">
                        <a class="nav-link" href="/cv">CV</a>
                    </li>
                </ul>
            </div>
        </nav>
        <nuxt/>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">Kirsty Wright | www.kirstywright.co.uk</span>
            </div>
        </footer>
    </div>
</template>

<style>
html, body {
    background-color: #45405e;
    color: #fff;
}
.footer {
    margin-top:20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
}
</style>
<!-- $nuxt.$route.name -->

<script>

export default {
    mounted: function(){
    }
}
</script>
