<template lang="html">
    <div>
        <div class='text-center mb-4'><h1>Personal Projects</h1></div>
        <div class="row mb-2">
            <div class="col-md-12">
                <div class="project-card flex-md-row">
                    <div class="project-card__content">
                        <div class="mb-3">
                            <img class="project-card__med-icon mr-2" src='~/assets/projects/clevergirls.png' style='max-width:250px;height:auto;border-radius:5px;'/>
                        </div>
                        <div>
                            <p>
                                Clevergirls is an online gaming community and news site dedicated to promoting and informing players about online games that interest its audience. Content includes articles, podcasts, streaming and a host of other features yet to be released. I worked as the sole developer on the project and was tasked with building both the front and backend of the site.
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
                            <p>Polaris is a automated assistant for an intelligence network for the game EVEonline, it runs and collects information from automated relays and external sources.</p>
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
