<template>
    <div>
        <section class="container">
            <div class="col-md-12">
                <About />
                <h1 class='text-center mb-4'>Roles</h1>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <img class="project-card__med-icon mr-2" src='~/assets/companies/las.png' style='width:72px;height:72px;'/>
                    <div class="project-card__content">
                        <h3 class='mb-1'>London Ambulance Service: Trainee Emergency Ambulance Crew</h3>
                        <div class="d-inline-block mb-2">August 2019 - Current</div>

                    </div>
                </div>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <img class="project-card__med-icon mr-2" src='~/assets/companies/fib.png' style='width:72px;height:72px;'/>
                    <div class="project-card__content">
                        <h3 class='mb-1'>Feed it back: Software Engineer</h3>
                        <div class="d-inline-block mb-2">January 2019 - August 2019</div>

                    </div>
                </div>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <img class="project-card__med-icon mr-2" src='~/assets/companies/shelter.png' style='width:72px;height:72px;'/>
                    <div class="project-card__content">
                        <h3 class='mb-1'>Shelter UK: Backend Developer</h3>
                        <div class="d-inline-block mb-2">April 2018 - December 2018</div>
                        <p>In my time at Shelter I have been involved in everything from refactoring old code to dealing with a large amount of technical debt. My main focus is around a few internal api servers which provide the backbone of our online services. One of my responsibilities was to reach feature parity with these new servers so we could decommission old and insecure infrastructure.</p>

                        I have been involved in a wide range of projects within Shelter across all our product teams including projects involving the following:
                        <ul>
                            <li>Automated scripts to bridge the gap between systems.</li>
                            <li>Compiling data exports &amp; reports using Python.</li>
                            <li>Building monitoring tools for internal &amp; external infrastructure.</li>
                            <li>Developing internal apis using Laravel &amp; Lumen.</li>
                            <li>Helping design &amp; implement new systems.</li>
                        </ul>
                    </div>
                </div>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <img class="project-card__med-icon mr-2" src='~/assets/companies/diverse.png' style='width:72px;height:72px;'/>
                    <div class="project-card__content">
                        <h3 class='mb-1'>Diverse Interactive: Full Stack Developer</h3>
                        <div class="d-inline-block mb-2">January 2018 - March 2018</div>
                        <p>
                            Most of my role consists of building Laravel based applications to help manage Apps and Systems. I have also been working more with Linux based servers and AWS cloud hosting.
                        </p>
                    </div>
                </div>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <img class="project-card__med-icon mr-2" src='~/assets/companies/minted.png' style='width:72px;height:72px;'/>
                    <div class="project-card__content">
                        <h3 class='mb-1'>Mintedbox: Web Developer</h3>
                        <div class="d-inline-block mb-2">July 2015 - December 2017</div>
                        <p>
                            I was initially employed alongside my apprenticeship and then I stayed on as a full stack developer.</p><p>
                            Whilst my role is a fullstack developer, my projects mainly consist of websites requiring bespoke systems or admin interfaces. I have gained experience in building mobile apps via Cordova as well as PHP based APIs to go with them. I have built many sites ranging from ecommerce sites with third party inventory management integrations to booking systems for hotels.
                        </p>
                    </div>
                </div>
            </div>
            <div id='projects'>
                <Projects />
            </div>
            <div id='interest'>
                <Interest />
            </div>
            <div class="col-md-12">
                <h1 class='text-center mb-4'>Volunteering</h1>
                <div class="project-card flex-md-row flex-wrap flex-sm-nowrap">
                    <div class="project-card__content">
                        <h3 class='mb-1'>British Red Cross: Enhanced Skills Event First Aid Volunteer</h3>
                        <div class="d-inline-block mb-2">January 2018 - Current</div>
                        <p>
                            Currently hold the following internal red cross certifications:
                            <ul>
                                <li>Standard first aid</li>
                                <li>Resuscitation Support</li>
                                <li>Medical</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import About from '~/components/About.vue'
import Projects from '~/components/Projects.vue'
import Interest from '~/components/Interest.vue'

export default {
    components: {
        About,
        Projects,
        Interest
    },
    head () {
        return {
            title: 'CV - Kirsty Wright',
            meta: [
                { hid: 'description', name: 'description', content: 'CV for Kirsty Wright.' }
            ]
        }
    }
}
</script>
