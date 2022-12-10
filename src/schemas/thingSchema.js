const dynamoose = require("dynamoose");

module.exports = new dynamoose.Schema({
    id: {
        type: String,
        rangeKey: true,
        required: false
    },
    name: {
        type: String,
 
        hashKey: true,
        required: false
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

 