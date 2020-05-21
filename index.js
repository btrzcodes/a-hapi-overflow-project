'use strict'
const config = require('./config');
const Hapi = require('hapi');
const inert = require('inert'); // serves static files
const path = require('path');

const server = Hapi.server({
  port: config.serverPort,
  host: config.host,
  routes: {
      files : {
          relativeTo: path.join(__dirname, 'public') // inert?
      }
  }
});

async function init () {
    try {
        // Happi needs to initialize plugins before server starts
        await server.register(inert);
        // next two routes are related to inert: sets index, and serves all public folder statics so that getting the front.
        server.route({
            method: 'GET',
            path: '/home',
            handler: (req, h) => {
                return h.file('index.html');
            }
        });

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.', // this means 'public' as is setted above.
                    index: ['index.html']
                }
            }
        });
    
        server.route({
            method: 'GET',
            path: '/i-want-to-see-madonna-live',
            handler: (req, h) => {
                return h.redirect('https://www.youtube.com/watch?v=Z26VOATBwhM')
            }
        });

        await server.start();

    } catch (error) {
        console.error(error);
        process.exit(1); // that 1 is used when exits at an error block
    }

    console.log(`Server happily running @ ${server.info.uri}`);
}

init();