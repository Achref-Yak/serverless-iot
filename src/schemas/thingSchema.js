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

    on: {
        type: Number,
    },
    sensitivity: {
        type: Number,
    },
    threshold: {
        type: Number,
    },


    analogSensorData: {
        type: Object,
        schema: {
            temperature: {
                type: Number,
            },
            humidity: {
                type: Number,
            },
        },
    },

    gaz: {
        type: String,
        required: false,

    },

});

