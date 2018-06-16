<template lang="html">
    <div class='terminal'>
        <div class="terminal__header">
            <div class="terminal__header__button-container">
                <div class="terminal__header-button terminal__header-button--red"></div>
                <div class="terminal__header-button terminal__header-button--yellow"></div>
                <div class="terminal__header-button"></div>
            </div>
        </div>
        <div class="terminal__body">
            <p>Hi</p>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.terminal {
    width:800px;
    height:300px;
    margin:20px auto;
}

.terminal__header {
    background-color: #d6d4d7;
    width:100%;
    height:20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
}

.terminal__header__button-container{
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
    min-height:200px;
    padding:5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
