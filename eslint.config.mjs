// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // vendored agent skills, not site code
  ignores: ['.claude/**']
})
