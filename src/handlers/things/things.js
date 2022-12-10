const AppError = require('../../utils/AppError');
const AppSuccess = require('../../utils/AppSuccess');

const { Aws } = require('aws-cdk-lib');
const IoT =require('aws-cdk-lib/aws-iot');
const IAM = require('aws-cdk-lib/aws-iam');
const ApI = require('aws-cdk-lib/aws-apigateway');
const cdk = require('aws-cdk-lib');
const ThingService = require('../../repository/thingService')
const { App, Stack } = require('aws-cdk-lib');
let thingTypeName = 'Type';
let thingName = 'Type';
let iotTopic = 'topic1';

 
exports.create = async (event) => {


    const app = new App();
 
    await  new cdk.Stack (app, "ThingService");

  app.synth();
    

  console.log(app);




};