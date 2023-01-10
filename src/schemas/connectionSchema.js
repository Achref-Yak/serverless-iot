const dynamoose = require("dynamoose");

module.exports = new dynamoose.Schema({

    connectionId: {
        type: String,
        required: false
    },

    thingName: {
        type: String,
        hashKey: true,
        required: false
    },
    timestamp: {
        type: Date,
        required: false,
        default: Date.now
    },

 

});

