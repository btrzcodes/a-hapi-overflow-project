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
        userData.password = await this.constructor.encrypt(userData.password); // constructor as it initializes the object in a class

        const newUser = this.collection.push(); // creates a new reference to this user collection
        newUser.set(userData);

        return newUser.key;
    }

    async validateUser (data) {
        const userMailQuery = await this.collection
                                        .orderByChild('email')
                                        .equalTo(data.email)
                                        .once('value') // TODO whant is this once() ?
        
        const user = userMailQuery.val() // Firebase returns X, we set it as an object then
        
        if(user){
            const userId = Object.keys(user)[0];
            const validPassword = await bcrypt.compare(
                                                    data.password, 
                                                    user[userId].password
                                                );
            const verfiedUser = validPassword ?
                user[userId] // Firebase object architecture.val() returns ID and, in sencond level, {name and email key values}... so the specific user is inside Id
                : false

            return verfiedUser;
        }

    }

    static async encrypt (password) { // static method: cant be called trhough a class instance. Has no acces to data stored in specific objects
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;
    }
}

module.exports = Users;