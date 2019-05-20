<template lang="html">
  <ul class='row-list'>
      <li class='row-list__item'>
          <a href="https://twitter.com/KirstyWrightWeb" target="blank_">
              <h3 class='row-list__title'>Twitter</h3>
              <p class='row-list__body'>Checkout my twitter, where I usually ramble about nonsense and occasionally talk about computers.</p><i class="row-list__icon fab fa-twitter"></i>
          </a>
      </li>
      <li class='row-list__item'>
          <a href="https://github.com/KirstyWright/" target="blank_">
              <h3 class='row-list__title'>Github</h3>
              <p class='row-list__body'>This is where I host all of my code both public and private. Recent projects can be found here.</p><i class="row-list__icon fab fa-github"></i>
          </a>
      </li>
      <li class='row-list__item'>
          <a href="https://codepen.io/kirstywright/" target="blank_">
              <h3 class='row-list__title'>Codepen</h3>
              <p class='row-list__body'>All of my random snippets of frontend code or random styles can be found here.</p><i class="row-list__icon fab fa-codepen"></i>
          </a>
      </li>
  </ul>
</template>

<script>
</script>

<style lang="css">
  .row-list {
  width:100%;
  display:block;
  padding:0px;
  list-style:none;
  background-color:rgba(0, 0, 0, .2);
}
.row-list__item a {
  color:#fff;
}
.row-list__item {
  display:block;
  padding:10px;
  padding-right:90px;
  text-decoration:none;
  position:relative;
}
  
.row-list__item::after {
  content: '';
  width:100%;
  height:0px;
  background:#ccc;
  display:block;
}

.row-list__icon{
  right:20px;
  top:20px;
  color:#fff;
  font-size:60px;
  position:absolute;
}
</style>
