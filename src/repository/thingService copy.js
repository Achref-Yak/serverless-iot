const dynamoose = require("dynamoose");
const UserSchema = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
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

  async createGroup()
  {
    const params = {
      parentGroupName: "testGroup",
      
    }
    return await Iot.createThingGroup({params}).promise().catch(err => console.log(err));
  }


  async createThing(group) {

    this.createGroup(data => {

    })
    return Iot.createThing({
      thingName: this.thingName
    }).promise().then(
      thing => {

        let myManagedPolicy = {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": "iot:Publish",
              "Action": "iot:Subscribe",
              "Resource": `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNT}:topic/iot/${this.thingTopic}`
            },
            {
              "Effect": "Allow",
              "Action": [
                "iot:Connect",
              ],
              "Resource": thing.thingArn
            },
  
          ]
        };

     

      
        var params = {
          policyDocument: JSON.stringify(myManagedPolicy),
          policyName: 'iotPolicy109',
        };
        Iot.getPolicy({ policyName: params.policyName} ).promise().then(
          data => {
             if(data)
             {
              console.log("already exists");
              // create iot certificate and set active status to true
              
              Iot.createKeysAndCertificate({setAsActive: true}).promise().then( cert =>{
                console.log(cert);
                console.log(cert.keyPair.PublicKey);
                console.log(cert.keyPair.PrivateKey);
                console.log("cert created");
                Iot.attachThingPrincipal({principal: cert.certificateArn, thingName: this.thingName}).promise().then(
                  data => {
                    console.log("attached cert to thing");
                    console.log({policyName: params.PolicyName, target: cert.certificateArn});
                   Iot.attachPrincipalPolicy({ principal: cert.certificateArn, policyName: params.policyName}).promise().then(
                      data => {
                        console.log("attached policyName to thing");
                        this.createRule().then( data => {
                          console.log("rule created");
                          this.createSQSQueue().then( data => {
                            console.log("queue created");
                          }
                          ).catch(err => {
                            console.log(err);
                          })
                        }).catch(err => console.log(err))
                          
                      }
                    ).catch(err => {
                      console.log(err);
                    })

                  }
                ).catch(err => console.log("aa"+err))
                
      
            }).catch(err => console.log(err))
             }else
             {
             
             }
          }).catch(err => {
              console.log(err);
              Iot.createPolicy(params).promise().then(
                policy => {
                  Iot.createKeysAndCertificate().promise().then( cert =>{
                    console.log("cert created");
                    console.log(cert.keyPair.PrivateKey);
                    Iot.attachThingPrincipal({principal: cert.certificateArn, thingName: this.thingName}).promise().then(
                      data => {
                        console.log("attached cert to thing");
                        console.log({policyName: params.policyName, target: cert.certificateArn});
                       Iot.attachPolicy({policyName: params.policyName, target: cert.certificateArn}).promise().then(
                          data => {
                            console.log("attached policyName to thing");
                            this.createRule().then( data => {
                              console.log("rule created");
                            }).catch(err => console.log(err))
                            this.createSQSQueue().then( data => {
                              console.log("queue created");
                            }
                            ).catch(err => {
                              console.log(err);
                            }
                            )
                          }
                        ).catch(err => {
                          console.log(err);
                        })
  
                      }
                    ).catch(err => console.log("aa"+err))
                    
          
                }).catch(err => console.log(err))
                 
                }
              ).catch(err => {
                console.log(err);
                return err;
              })
          })

   
      }
    ).catch(err => {
      console.log(err);
      return err;
    })
  }


  createRule(){
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

