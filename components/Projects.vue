<template lang="html">
    <div>
        <div class='text-center mb-4'><h1>Personal Projects</h1></div>
        <div class="row mb-2">
            <div class="col-md-12">
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <h3>CAD</h3>
                        <div>
                            <p>
                                CAD is a web based computer aided dispatch system for a Fivem based roleplay community. It comprises of a VueJs based frontend with a PHP backend that utilises Slim and Eloquent which is attached to a MariaDB database. It is designed to give upwards of 50 concurent users a live updating management system which utilises websockets to rapidly update users when information changes.<br><br>
                                Whilst the code is currently closed source, I am looking at making a open version in the future.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <h3>Screeps</h3>
                        <div>
                            <p>
                                Screeps is a RTS game that is powered by javascript code that runs in a constant loop. Players use their Javascript code to control little figures (screeps) in an attempt to fight other players, develop land and eventually form an empire (not that I got that far).<br><br>For me, Screeps was an adventure into attempting to build a Javascript based bot whilst also allowing me to learn Typescript. I never did get far into the game but I enjoy the time sync it gave me. The bot can be found <a href='https://github.com/KirstyWright/screepsAI'>here</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <h3>Quiz</h3>
                        <div>
                            <p>
                                This was a simple quiz app that runs on VueJs that was developed during my driving course within the Ambulance service as a way we could test ourselves with our roadsigns knowledge.
                                <br><br>The code can be found <a href='https://github.com/KirstyWright/quiz'>here</a> with the application being visible <a href='https://quiz.kirsty.dev'>here</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <div class="mb-3">
                            <img class="project-card__med-icon mr-2" src='~/assets/projects/clevergirls.png' style='max-width:250px;height:auto;border-radius:5px;'/>
                        </div>
                        <div>
                            <p>
                                Clevergirls was an online gaming community and news site dedicated to promoting and informing players about online games that interest its audience. Content included articles, podcasts and streams. I worked as the sole developer on the project and was tasked with building both the front and backend of the site.
                            </p>
                            <p>
                                The frontend was customer facing and displayed articles and other content that was written by authors on the site. The backend contained a simple system for content authors to write articles and upload content. This was then proof read by editors who would make edits before submitting the finished pieces to the site.
                            </p>
                            <ul>
                                <li>Backend with multiple user levels.<ul>
                                    <li>Management of users and groups.</li>
                                    <li>Author interface to create and draft articles.</li>
                                    <li>Editor interface to edit and release articles.</li>
                                    <li>Streamer interface to schedule streams for display in the timetable.</li>
                                </ul></li>
                                <li>Tag system for filtering articles.</li>
                                <li>Article categories to allow for podcasts and blogs.</li>
                                <li>Streamer timetable with links to twitch and other streaming services.</li>
                                <li>Commenting on articles with Disqus.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <div class="mb-3">
                            <img class="project-card__med-icon mr-2" src='~/assets/projects/polaris.png' style='max-width:200px;height:auto;border-radius:5px;'/>
                        </div>
                        <div>
                            <p>Polaris was an automated assistant for an intelligence network for the game EVEonline, it ran and collected information from automated relays and external sources.</p>
                            <p>
                                Components of Polaris include:
                            </p>
                            <ul>
                                <li>Management of 4 linux servers.</li>
                                <li>Desktop Python programs to collect specific program log files.</li>
                                <li>EVE single sign on and REST api integration.</li>
                                <li>Discord bots on a Python framework to output important information.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {}
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
