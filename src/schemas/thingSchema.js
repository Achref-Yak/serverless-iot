const dynamoose = require("dynamoose");

module.exports = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        required: false
    },
    thingName: {
        type: String,

        required: false
    },
    timestamp: {
        type: String,
        required: false
    },


    gaz: {
        type: String,
        required: false,
 
    },

});

