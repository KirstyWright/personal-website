<template lang="html">
    <div>
        <div class="project-card" >
            <div class="d-inline-flex flex-wrap flex-md-nowrap justify-md-content-center">
                <img src="~/assets/me.jpg" alt="Picture of Kirsty" class='mr-3 mb-3'>
                <div>
                    <p>My name is Kirsty and I used to make computers do as they are told, most of the time they listen to me and sometimes they don't. Developing is a passion for me, whether its a paid piece of work or a personal project I enjoy and take pride in what I do.</p>
                    <p>I recently changed careers to work within the Ambulance service and I am planning on continuing on that career path. With regard to developing, I do maintain my skills as a hoby and do occasionally take on work when I have the time.</p>
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
.project-card > div > img {
  display:block;
  max-width:200px;
  max-height:200px;
}
@media only screen and (max-width: 768px) {
  .project-card > div > img {
    display:block;
    height:auto;
    max-width:200px;
  }
}
</style>
