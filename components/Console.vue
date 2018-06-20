<template lang="html">
    <div id='js-terminal' class='terminal'>
        <div class="terminal__header">
            <div class="terminal__header-button-container">
                <div class="terminal__header-button terminal__header-button--red"></div>
                <div class="terminal__header-button terminal__header-button--yellow"></div>
                <div class="terminal__header-button"></div>
            </div>
        </div>
        <div class="terminal__body">
            <div class="terminal__start">
                <p>Hi there, welcome to my corner of the internet. Not entirely sure why you are here as I have no amazing cat videos or public access databases.</p>
                <p>Yes this is a terminal (sorta) and it does so some stuff. Why don't you try typing `help` and hitting enter.</p>
            </div>
            <div id="terminal__results-area">
                <p class="mb-0" v-bind:key="index" v-for="(row,index) in output"><span class='terminal__body-prefix' v-if="row.type==='command'">guest$&nbsp;</span><span v-html="row.content"></span></p>
            </div>
            <div v-show='false' class='terminal__input-row'><span class='terminal__body-prefix'>guest$&nbsp;</span><span id='terminal__user-input'></span><span class="terminal__cursor">|</span></div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            'output':[]
        }
    },
    mounted: function(){
        $('.terminal').height(window.innerHeight - 70);
        $('.terminal__input-row').show();
        document.onkeydown = (e) => {
            let key = e.keyCode || e.charCode;
            let input = document.getElementById('terminal__user-input');
            if (key == 13) {
                this.output.push({
                    content: input.innerHTML,
                    type: 'command'
                })
                let response = this.parseCommand(input.innerHTML);
                input.innerHTML = "";
                this.output.push({
                    content: this.runCommand(response['command'],response['args']),
                    type: response
                })
            } else if (key == 8 || key == 46) {
                e.preventDefault();
                input.innerHTML = input.innerHTML.slice(0,-1)
            } else if (key >= 32 && key <= 126) {
                input.innerHTML = input.innerHTML + e.key
            }
        }
    },
    methods: {
        parseCommand: function(line) {
            let words = line.split(' ');
            return {
                command: (words.length > 0 ? words[0] : ''),
                args: words.splice(1)
            }
        },
        runCommand: function(command,args) {
            switch (command) {
                case 'clear':
                    this.output = [];
                    break;
                case 'hi':
                    return 'hello';
                case 'goto':
                    return '<a href="https://xkcd.com/292/" target="_blank">really ....</a>';
                case 'whoami':
                    return 'How am I supposed to know who you are? Only you can answer that!';
                case 'open':
                    let pages = ['projects','cv','about'];
                    if (pages.includes(args[0])) {
                        window.location.href = '/'+args[0];
                        return
                    } else {
                        return 'invalid page. Pick from: '+pages.join(', ');
                    }
                case 'social':
                    return '<a href="https://twitter.com/KirstyWrightWeb" target="_blank">Twitter</a>, <a href="https://www.linkedin.com/in/kirstywrightweb/" target="_blank">Linkedin</a>, <a href="https://github.com/KirstyWright" target="_blank">Github</a>';
                case 'help':
                    let commands = [
                        '-- Commands are listed below --',
                        'clear: clears the console',
                        'hi: says hello',
                        'goto: just try it',
                        'open: opens a page on this website',
                        'social: gives you my social media links',
                        'whoami: reminds you who you are'
                    ];
                    return commands.join('<br>');
                default:
                    return command+" is not a recognised command"

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
