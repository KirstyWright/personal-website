<template lang="html">
    <div class="col-md-12">
        <div class="project-card flex-md-row">
            <img class="project-card__med-icon mr-2" src='~/assets/projects/placeholder.png' style='width:72px;height:72px;'/>
            <div class="project-card__content">
                <div class="d-inline-block mb-2" v-bind:key='tag' v-for="(tag, index) in project.tags">
                    {{tag}}<span v-if="index+1 < project.tags.length">,&nbsp;</span>
                </div>
                <h2 class='mb-1'>{{project.name}}</h2>
                <p v-html="project.description"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['project']
}
</script>

<style lang="css">
    .project-card {
        display: flex;
        word-wrap: break-word;
        background-color: rgba(0,0,0,0.2);
        padding:10px;
        margin-bottom:30px;
    }
</style>
