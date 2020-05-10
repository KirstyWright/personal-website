const {
    Nuxt,
    Builder
} = require('nuxt')

const isProd = (process.env.NODE_ENV === 'production')
const http = (isProd ? require('https') : require('http'))
const fs = require('fs')
const port = process.env.PORT || 3000

// We instantiate nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js

// Build only in dev mode with hot-reloading
if (config.dev) {
    new Builder(nuxt).build()
        .then(listen)
        .catch((error) => {
            console.error(error)
            process.exit(1)
        })
} else {
    listen()
}

function listen() {
    let options = {}
    if (isProd) {
        options = {
            key: fs.readFileSync('/etc/letsencrypt/live/kirsty.dev/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/kirsty.dev/cert.pem')
        };
    }


    http
        .createServer(options, nuxt.render)
        .listen(port)
    console.log('Server listening on `localhost:' + port + '`.')
}
