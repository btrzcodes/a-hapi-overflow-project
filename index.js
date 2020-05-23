'use strict'
const config = require('./config');
const Hapi = require('hapi');
const handlebars = require('handlebars');
const vision = require('vision');
const inert = require('inert'); // serves static files
const path = require('path');
const routes = require('./routes');

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
        await server.register(vision); // to serve dynamic front
        //await server.register(handlebars); // No need to register this. Engine to make dynamic front templates
        
        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname, // so that views are apart from public folder
            path: 'views',
            layout: true, // avoids html piece repetitions
            layoutPath: 'views'
        })
        // next two route are related to inert: sets index, and serves all public folder statics so that getting the front.
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

        // auth cookies
        server.state( 'user', { // the name of the cookie that will encrypt pass and email so that can auto auth
            ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
            isSecure: config.env === 'production', // depends on the enviroment, dev no secure, prod secure.
            encoding: 'base64json'
        })

        server.route(routes);

        await server.start();

    } catch (error) {
        console.error(error);
        process.exit(1); // that 1 is used when exits at an error block
    }

    console.log(`Server happily running @ ${server.info.uri}`);
}

// Avoids unhandled rejection errors. Kind of catch all err
process.on('unhandledRejection', error => {
    console.error('UnhandledRejection', error.message, error);
})
process.on('UnhandledException', error => {
    console.error('UnhandledException', error.message, error);
})


init();