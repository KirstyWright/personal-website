<template lang="html">
    <div class='terminal'>
        <div class="terminal__header">
            <div class="terminal__header-button-container">
                <div class="terminal__header-button terminal__header-button--red"></div>
                <div class="terminal__header-button terminal__header-button--yellow"></div>
                <div class="terminal__header-button"></div>
            </div>
        </div>
        <div class="terminal__body">
            <span class="terminal__body--animated-content" id='terminalType'></span>
            <div id="terminal__results-area"></div>
            <div v-show='false' class='terminal__input-row'><span class='terminal__body-prefix'>guest$</span><span id='terminal__user-input'> </span><span class="terminal__cursor">|</span></div>
        </div>
    </div>
</template>

<script>
import Typed from 'typed.js';

export default {
    mounted: function(){
        $('.terminal').height(window.innerHeight - $('.navbar').height() - 70);
        var terminalTyped = new Typed('#terminalType', {
            strings: [
                'Hi, my name is Kirsty and I am a backend web developer.^500 <br><br>Welcome to my personal website. ^500 <br><br> <a href="https://github.com/KirstyWright" target="_blank">GitHub</a>, <a href="https://www.linkedin.com/in/kirstywrightweb/" target="_blank">Linkedin</a>, <a href="mailto:kirsty@evecmdr.com">Email</a><br>'
            ],
            typeSpeed: 30,
            backspeed: 0,
            backDelay: 3000,
            loop: false,
            showCursor: false,
            onComplete: (self) => {
                $('.terminal__input-row').show();
            }
        });
        document.onkeydown=function(e){
            let key = e.keyCode || e.charCode;
            if (key == 13) {
                console.log('ENTER');
                $('#terminal__results-area').html($('#terminal__results-area').html()+'<p>'+$('.terminal__body-prefix').html()+$('#terminal__user-input').html()+'</p>');
                $('#terminal__user-input').html('');
            } else if (key == 8 || key == 46) {
                e.preventDefault();
                $('#terminal__user-input').html($('#terminal__user-input').html().slice(0,-1))
            } else {
                $('#terminal__user-input').html($('#terminal__user-input').html()+e.key)
            }
        }
    }
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
.terminal {
    width:100%;
    margin:20px auto 20px auto;
}

.terminal__header {
    background-color: #d6d4d7;
    width:100%;
    height:20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
}

.terminal__header-button-container{
    height:100%;
    padding:5px;
}

.terminal__header-button {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #34ca46;
    float:left;
    margin: 0 3px;
}

.terminal__header-button--yellow {
    background-color: #fabf3c;
}

.terminal__header-button--red {
    background-color: #f26465;
}

.terminal__body {
    background-color: #000000;
    font-family: 'Roboto Mono', monospace;
    font-size:15px;
    height:100%;
    padding:5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.terminal__cursor{
    font-weight: 100;
    color: #fff;
    animation: 1s blink step-end infinite;
}

@keyframes "blink" {
  from, to {
    color: transparent;
  }
  50% {
    color: #fff;
  }
}

</style>
