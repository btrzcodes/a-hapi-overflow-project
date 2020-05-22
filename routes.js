'use strict'
const site = require('./controllers/site');
const user = require('./controllers/user');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    // REGISTRATION
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        options: {
            validate : {
                payload: {
                    name: Joi.string().required().min(3),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6),


                }
            }
        },
        path: '/create-user',
        handler: user.createUser
    },  
    // LOGIN
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'POST',
        options: {
            validate : {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6),
                }
            }
        },
        path: '/validate-user',
        handler: user.validateUser
    }, 

    { // special secret route:
        method: 'GET',
        path: '/i-want-to-see-madonna-live',
        handler: (req, h) => {
            return h.redirect('https://www.youtube.com/watch?v=Z26VOATBwhM')
        }
    }
]