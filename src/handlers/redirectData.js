const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');
const { log } = require('winston');

const apig = new AWS.ApiGatewayManagementApi({
    endpoint: "https://coy3kmsji3.execute-api.us-east-1.amazonaws.com/dev"
  });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const ConnectionService = require('../repository/connectionService');

 
exports.defaultHandler = async function(event, context) {


    await new ConnectionService().getConnectionIdByThingName("myThing").then(data => {
        console.log("data", data);
         apig.postToConnection({
            ConnectionId: data.connectionId,
            Data: `Foward: ${data}`
          }).promise().then(() => {
      return { statusCode: 200, data: data };
          }).catch((err) => {
            console.log("err", err);
            return { statusCode: 500, data: err };
          });


    });
}