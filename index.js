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
            return 'Hapi to return something!';
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