// Cache-Control for HTML responses. The old nginx vhost added this before the
// site moved to Kubernetes; ingress-nginx cannot (add_header needs a
// configuration-snippet, and snippet annotations are disabled cluster-wide), so
// it lives in the app and travels with the deploy. Without it a browser can
// hold a stale index.html pointing at content-hashed /_nuxt/ bundles that no
// longer exist after a deploy — white screen until a hard refresh.
//
// On the `beforeResponse` hook rather than server/middleware because the
// response content-type is only known once the handler has run, and because
// Nitro registers the static-asset handler ahead of user middleware — so
// middleware would silently stop applying to any route that later gets
// prerendered. Only text/html is touched, so /_nuxt/ keeps the immutable
// max-age it gets from Nitro's public-asset route rule.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    if (getResponseHeader(event, 'cache-control')) return

    const contentType = getResponseHeader(event, 'content-type')
    if (typeof contentType === 'string' && contentType.startsWith('text/html')) {
      setResponseHeader(event, 'cache-control', 'no-cache, no-store, must-revalidate')
    }
  })
})
