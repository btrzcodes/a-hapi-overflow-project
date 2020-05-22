'use strict'
const site = require('./controllers/site');
const user = require('./controllers/user');
//This is going to be a routes array! Without calling  each time
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        path: '/create-user',
        handler: user.createUser
    },   
    { // special secret route:
        method: 'GET',
        path: '/i-want-to-see-madonna-live',
        handler: (req, h) => {
            return h.redirect('https://www.youtube.com/watch?v=Z26VOATBwhM')
        }
    }
]