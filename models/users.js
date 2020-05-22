'use strict'
const bcrypt = require ('bcrypt');

class Users {
    constructor (db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users'); // This creates a child collection
    }

    async create (data) {
        const userData = { ...data }; 
        // data needs to be destructured because new Hapi version decorates with null prototipe incompatible with Firebase...
        // console.log(data);
        userData.password = await this.constructor.encrypt(userData.password); // constructor as it initializes the object in a class

        const newUser = this.collection.push(); // creates a new reference to this user collection
        newUser.set(userData);

        return newUser.key;
    }

    static async encrypt (password) { // static method: cant be called trhough a class instance. Has no acces to data stored in specific objects
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;
    }
}

module.exports = Users;