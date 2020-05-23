'use strict'
// Controlles will manage the handlers

function home(req, h) {
    return h.view('index',{
        title: 'Home',
        user: req.state.user
    })
}

function register(req, h) {
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('register',{
        title: 'Register',
        user: req.state.user
    })
}

function login(req, h) {
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('login',{
        title: 'Login',
        user: req.state.user
    })
}

function notFound(req, h) {
    return h.view('404',
        {}, // no parameter to pass, is like a null or empty object
        {layout: 'error-layout'} // Vision propierty to change template
    )
    .code(404)
}

function fileNotFound(req, h) {
    const response = req.response;
    if(response.isBoom && response.output.statusCode === 404 ){  // intercepts boom managed error
        return h.view('404',
            {}, // no parameter to pass, is like a null or empty object
            {layout: 'error-layout'} // Vision propierty to change template
        )
        .code(404)
    }
    // h.continue the h (hapi res) lifecycle if its not a 404 error
    return h.continue;
}

module.exports = {
    home,
    register,
    login,
    notFound,
    fileNotFound
}
