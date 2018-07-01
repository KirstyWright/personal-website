<template lang="html">
    <div>
        <h1 class='text-center'>About me</h1>
        <div class="project-card" >
            <div class="d-inline-flex">
                <img src="~/assets/me.jpg" style='display:block;width:200px;height:200px;' alt="Picture of Kirsty" class='mr-3'>
                <div>
                    <p>My name is Kirsty and I make computers do as they are told, most of the time they listen to me and sometimes they don't. Developing is a passion for me, whether its a paid piece of work or a personal project I enjoy and take pride in what I do.</p>
                    <p>At the moment my skills are more focused on backend web systems, but I enjoy working on a wide array of systems and architectures.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
