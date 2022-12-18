const dynamoose = require("dynamoose");
const UserSchema = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger')
const { v1: uuidv1 } = require('uuid');
const Aws = require('aws-sdk');
const Iot = new Aws.Iot();
const Iam = new Aws.IAM();

let thingName = 'Type1';
let iotTopic = 'topic1';
const ThingSchema = require('../schemas/thingSchema');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })




class ThingService {
  tableName = 'usersTable';
  thingName = 'testThing';
  thingTopic = 'testTopic';
  dbInstance;
  constructor() {

    this.dbInstance = dynamoose.model(this.tableName, UserSchema);
  }

  createGroup() {
    const params = {
      thingGroupName: "testGroup",

    }
    return Iot.createThingGroup( params ).promise()




  }

  createPolicy(group) {


 


    let myManagedPolicy = {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": ["iot:Subscribe", "iot:Publish"],
          "Resource": `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNT}:topic/iot/${this.thingTopic}`
        },
        {
          "Effect": "Allow",
          "Action": [
            "iot:Connect",
          ],
          "Resource": `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNT}`+":client/${iot:Connection.Thing.ThingName}"
        },

      ]
    };




    var policyParams = {
      policyDocument: JSON.stringify(myManagedPolicy),
      policyName: 'iotGroupPolicy7',
    };

   return Iot.createPolicy(policyParams).promise().then( data => {
      console.log("policy created");
      return Iot.attachPolicy({policyName: policyParams.policyName, target: group.thingGroupArn}).promise().then( data => {
        console.log("policy attached to group");
        return policyParams.policyName;
      }).catch(err => {
        logger.error(err); 
      })
  
   }).catch(err => {
    logger.error(err);
  })

  }




  createThingsInGroup(group, policyName){
    console.log(policyName);
    const name = "testThing-"+ uuidv1();
    const params = {
      thingName: name
    }
    return Iot.createThing(params).promise().then( thing => {
      this.createThingCertificate(name, policyName).then(data => {
        console.log("attached cert to thing");
        return Iot.addThingToThingGroup({thingArn: thing.thingArn, thingGroupArn: group.thingGroupArn}).promise().then( data => {
          console.log("attached thing to group");
          
        }).catch(err => {
          logger.error(err); 
        }
        )
      }).catch(err => console.log(err))
  
    })
  }


  createThingCertificate(name, _policyName) {
    return Iot.createKeysAndCertificate({setAsActive: true}).promise().then(cert => {
      console.log("cert created");
      console.log(cert.certificatePem);
      console.log(cert.keyPair.PrivateKey);
      return Iot.attachThingPrincipal({thingName: name, principal: cert.certificateArn}).promise().then( data => {
        console.log("thing attached to cert");
       


        }).catch(err => {
          logger.error(err); 
        })
      
    }).catch(err => logger.error(err))
  }


 

  createStack(){

  
    return this.createGroup().then(

      group => {


        this.createPolicy(group).then( data => {
          console.log("policy created");
          for (let index = 0; index < 3; index++) {
            this.createThingsInGroup(group, data).then( data => {
        
                console.log("attached thing to group");
            }).catch(err => {
              logger.error(err); 
            });
            
          }
        }).catch(err => {
          logger.error(err);
        })
      
    
       
    

        })



 
 


  }


  createRule() {
    return Iot.createTopicRule({
      ruleName: 'testRule',
      topicRulePayload: {
        actions: [
          {
            dynamoDB: {
              hashKeyField: 'id',
              hashKeyValue: '123',
              hashKeyType: 'STRING',
              payloadField: 'payload',
              rangeKeyField: 'range',
              rangeKeyValue: '456',
              rangeKeyType: 'STRING',
              tableName: 'testTable',
              roleArn: 'arn:aws:iam::766779933142:role/iotserverless-dev-IotRole-N2ABXEYT02YN'
            }
          },
        ],
        awsIotSqlVersion: '2016-03-23',
        description: 'test',
        ruleDisabled: false,
        sql: `SELECT * FROM 'iot/${this.thingTopic}'`

      }
    }).promise();
  }

  createSQSQueue() {

    // create iot rule to send to sqs
    return Iot.createTopicRule({
      ruleName: 'testRule1',
      topicRulePayload: {
        actions: [
          {
            sqs: {
              queueUrl: 'https://sqs.us-east-1.amazonaws.com/766779933142/testQueue',
              roleArn: 'arn:aws:iam::766779933142:role/iotserverless-dev-IotRole-N2ABXEYT02YN',
              useBase64: true
            }
          },
        ],
        awsIotSqlVersion: '2016-03-23',
        description: 'test',
        ruleDisabled: false,
        sql: `SELECT * FROM 'iot/${this.thingTopic}'`

      }
    }).promise();

  }


}

module.exports = ThingService

