const uniqid = require('uniqid');
const crypt = require('bcryptjs')

class User {
    constructor(email, password) {
        this.userId = uniqid();
        this.email = email;
        this.password = password; //hashed word
        this.createdAt = Date.now();
    }
}

module.exports = User;

