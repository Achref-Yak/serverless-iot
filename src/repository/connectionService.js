const Model = require("dynamoose/dist/Model");
const dynamoose = require("dynamoose");
const ConnectionSchema = require('../schemas/connectionSchema');
const User =  require("../models/User");
const bcrypt = require('bcryptjs');
const hasha = require('hasha');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { logger } = require("dynamoose");

module.exports = class UserService {

    dbInstance;
    constructor() {
      const tableName = 'connectionsTable';
      this.dbInstance = dynamoose.model( tableName, ConnectionSchema);
    }
    
   

    async createConnection (data) {

        console.log("data", data);


        return await this.dbInstance.create(data)
      
         

  }

  async getConnectionIdByThingName (thingName) {

    // query one item

    return await this.dbInstance.get(thingName);
  

  }
  }