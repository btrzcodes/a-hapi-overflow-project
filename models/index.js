'use strict'

const firebase = require('firebase-admin');
const serviceAccount = require('../config/firebase.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://hapi-overflow-253c7.firebaseio.com/'
})

const db = firebase.database(); // creates DB connection

const Users = require('./users')

module.exports = {
    users: new Users(db)
}