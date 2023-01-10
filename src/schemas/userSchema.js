const dynamoose = require("dynamoose");

module.exports = new dynamoose.Schema({
    id: {
        type: String,

        required: false
    },
    email: {
        type: String,
        required: true,
        hashKey: true,
        default: ""
    },

    password: {
        type: String,
        required: true,

    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});

