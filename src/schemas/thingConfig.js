const dynamoose = require("dynamoose");

module.exports = new dynamoose.Schema({

    thingName: {
        type: String,
        hashKey: true,
        required: false
    },
    configuration: {
        on: {
            type: Number,
        },
        sensitivity: {
            type: Number,
        },
        threshold: {
            type: Number,
        },

    },

});

