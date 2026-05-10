import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faArrowDown,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

import {
  faGithub,
  faXTwitter,
  faLinkedin,
  faCodepen
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faArrowDown,
  faEnvelope,
  faGithub,
  faXTwitter,
  faLinkedin,
  faCodepen
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
