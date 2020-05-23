'use strict'

const users = require('../models/index').users;

async function createUser (req, h) {
  let createdUser;
  try {
      createdUser = await users.create(req.payload)
      return h.response('User created with ID '+ createdUser);

  } catch (error) {
      console.error(error);
      return h.response('Problems creating user')
              .code(500)
  }
}

async function validateUser (req, h) {
  let validatedUser;
  try {
      validatedUser = await users.validateUser(req.payload);
      
      if(!validatedUser){
          return h.response('Invalid credentials to login')
                  .code(401)
      }

      const { name, email } = validatedUser;

      return h.redirect('/')
              .state('user', { // this both are hashed in our cookie
                  name,
                  email
              })
              
  } catch (error) {
      console.error(error);
      return h.response('Problems validating user')
              .code(500)
  }
}

function logout (req, h) {
    return h.redirect('/login')
            .unstate('user') // disables user cookie
}

module.exports = {
    createUser,
    validateUser,
    logout
}