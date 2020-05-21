'use strict'

const Hapi = require('hapi');
const config = require('./config');

const server = Hapi.server({
  port: config.serverPort,
  host: config.host
});

async function init () {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return h.response('Hapi to return something!')
                    .code(200);
        }
    });

    server.route({
        method: 'GET',
        path: '/i-want-to-see-madonna-live',
        handler: (req, h) => {
            return h.redirect('https://www.youtube.com/watch?v=Z26VOATBwhM')
        }
    });

    try {
        await server.start();
    } catch (error) {
        console.error(error);
        process.exit(1); // that 1 is used when exits at an error block
    }

    console.log(`Server happily running @ ${server.info.uri}`);
}

init();