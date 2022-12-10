const dynamoose = require("dynamoose");
const bcrypt = require('bcryptjs');
const { v1: uuidv1 } = require('uuid');
const { Aws } = require('aws-cdk-lib');
const IoT =require('aws-cdk-lib/aws-iot');
const IAM = require('aws-cdk-lib/aws-iam');
const ApI = require('aws-cdk-lib/aws-apigateway');
let thingTypeName = 'Type';
let thingName = 'Type';
let iotTopic = 'topic1';
const ThingSchema = require('../schemas/thingSchema');
const  cdk = require('aws-cdk-lib');

const { Construct } = require('constructs');


 class ThingService  extends Construct{

 
    constructor(scope, id, props) {
      super(scope, id);
      
 
    
  
  }}

  module.exports =  ThingService

  