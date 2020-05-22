'use strict'
// Controlles will manage the handlers

function home(req, h) {
    return h.view('index',{
        title: 'Home'
    })
}

function register(req, h) {
    return h.view('register',{
        title: 'Register'
    })
}

module.exports = {
    home,
    register
}
