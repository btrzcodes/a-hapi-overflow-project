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
        return validatedUser = await users.validateUser(req.payload);

    } catch (error) {
        console.error(error);
        return h.response('Problems validating user')
                .code(500)
    }
}

module.exports = {
    createUser,
    validateUser
}