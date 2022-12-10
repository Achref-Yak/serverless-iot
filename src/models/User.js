
const dynamoose = require("dynamoose");
const userSchema = require('../schemas/userSchema');



// user class
exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

}

