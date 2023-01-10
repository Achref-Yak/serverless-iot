const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid');
const apig = new AWS.ApiGatewayManagementApi({
  endpoint: "https://9i509fvzt1.execute-api.us-east-1.amazonaws.com/dev"
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const ConnectionService = require('../repository/connectionService');

 
exports.defaultHandler = async function(event, context) {
  // For debug purposes only.
  // You should not log any sensitive information in production.
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
 
  const { body, requestContext: { connectionId, routeKey }} = event;
  switch(routeKey) {
    case '$connect':
      console.log('connect');
      console.log(event);

      const id = uuidv1();
    
        await new ConnectionService().createConnection({connectionId: connectionId, thingName: "myThing"}).then(data => {
          return { statusCode: 200, data: data };
  
        }).catch(err => {
          return { statusCode: 500 };
        });
     
 

      break;

    case '$disconnect':
        console.log('disconnect');
        break
    case 'routeA':
      await apig.postToConnection({
        ConnectionId: connectionId,
        Data: `Received on routeA: ${body}`
      }).promise();
      break;

    case '$default':
    default:
        console.log(event);
      await apig.postToConnection({
        ConnectionId: connectionId,
        Data: `Received on $default: ${body}`
      }).promise();
  }

  // Return a 200 status to tell API Gateway the message was processed
  // successfully.
  // Otherwise, API Gateway will return a 500 to the client.
  return { statusCode: 200 };
}