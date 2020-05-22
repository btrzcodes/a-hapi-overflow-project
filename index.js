'use strict'
const config = require('./config');
const Hapi = require('hapi');
const handlebars = require('handlebars');
const vision = require('vision');
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
        // next two routes are related to inert: sets index, and serves all public folder statics so that getting the front.
        server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                return h.view('index',{
                    title: 'Home'
                })
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
        // Registration
        server.route({
            method: 'GET',
            path: '/register',
            handler: (req, h) => {
                return h.view('register',{
                    title: 'Register'
                })
            }
        });
        server.route({
            method: 'POST',
            path: '/create-user',
            handler: (req, h) => {
                console.log(req.payload)
                return 'User created!'
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