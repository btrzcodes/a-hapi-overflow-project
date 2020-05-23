'use strict'
const Boom = require('boom');
const users = require('../models/index').users;

async function createUser (req, h) {
  let createdUser;
  try {
      createdUser = await users.create(req.payload)
      console.log(createdUser);
    //   return h.response('User created with ID '+ createdUser);
    return h.view('register', {
        title: 'Register',
        success: 'Wohooo! your user has succesfully been created'
    })

  } catch (error) {
      console.error(error);
    //   return h.response('Problems creating user')
    //           .code(500)
    return h.view('register', {
        title: 'Register',
        error: 'Problems creating your user'
    })
  }
}

async function validateUser (req, h) {
  let validatedUser;
  try {
      validatedUser = await users.validateUser(req.payload);
      
      if(!validatedUser){
        //   return h.response('Invalid credentials to login')
        //           .code(401)
        return h.view('login', {
            title: 'Login',
            error: 'Invalid credentials to login'
        })
      }

      const { name, email } = validatedUser;

      return h.redirect('/')
              .state('user', { // this both are hashed in our cookie
                  name,
                  email
              })
              
  } catch (error) {
      console.error(error);
    //   return h.response('Problems validating user')
    //           .code(500)
    return h.view('login', {
        title: 'Login',
        error: 'There was a problem while login'
    })
  }
}

function failedValidation (req, h, err) {
  const templates = {
    '/create-user': 'register',
    '/validate-user': 'login'
  }

  return h.view(templates[req.path], { // acceses to the route that is given the error
    title: 'Validation Error',
    error: 'Please complete required files'
  })
  .code(400)
  .takeover() // finalizes lifecycle of the request to return a view
}

function logout (req, h) {
    return h.redirect('/login')
            .unstate('user') // disables user cookie
}

module.exports = {
    createUser,
    validateUser,
    failedValidation,
    logout
}