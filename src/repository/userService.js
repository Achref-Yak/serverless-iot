const Model = require("dynamoose/dist/Model");
const dynamoose = require("dynamoose");
const UserSchema = require('../schemas/userSchema');
const User =  require("../models/User");
const bcrypt = require('bcryptjs');
const hasha = require('hasha');
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');
const { logger } = require("dynamoose");

module.exports = class UserService {

    dbInstance;
    constructor() {
      const tableName = 'usersTable';
      this.dbInstance = dynamoose.model( tableName, UserSchema);
    }
    
    async passwordConfirm (password, passwordConfirm) {
      if (password !== passwordConfirm) {
        return false;
      }
      return true;
    }



    signToken  = user => {
      return new Promise((resolve, reject) => {
        // User needs to be identified with id
        // We generate the refresh token :
        // we generate a string
       
        // We generate salt
    
    
        let refresh_token = hasha('unicorn');
        console.log(refresh_token);
    
        jwt.sign(
          user,
          "secret",
          {
            expiresIn: 86400 * 3 // 30 min in seconds
          },
          (err, jwttoken) => {
            if (err) {
              reject(err);
            }
            resolve([jwttoken, refresh_token]);
          }
        );
      });
    
    
    
    };
    
    
    createSendToken = (user) => {
    
    
      return this.signToken(user)
        .then(([token, refresh_token]) => {
          return  {
            success: true,
            user: user,
            token: "Bearer " + token,
            refresh_token: refresh_token
          };
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    
    
    
    
    
      // Remove password from output
    
    
    
    
      user.password = undefined;
    
    
    
    };


    async comparePassword (candidatePassword, hash) {
      console.log(candidatePassword);
      console.log(hash);
      return await bcrypt.compare(candidatePassword, hash);
    }

    async login (data) {
      
  
      return await this.dbInstance.get({email: data.email}).then((user) => {
        if (!user) {
          console.log('User does not exist');
          return false;
        }
        else {
          console.log("user exists");
 
           return this.comparePassword(data.password, user.password).then((isMatch) => {
            if (isMatch) {
              console.log('Password matched');
             return this.createSendToken(user.original());
            }
            else {
              console.log('Password does not match');
              return false;
            }
          }
          
          );
        }
      })

    
  };

    async signUp (data) {
     this.dbInstance.get({email: data.email}).then((user) => {

        if (user) {
          // logger.error('User already exists');
          console.log('User already exists');
          return false;
        }
        else {
          console.log("user does not exist");
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;
            console.log(data.password);
            const id = uuidv1();
            return  this.dbInstance.create({
              id: id,
              email: data.email,
              password: data.password,
            }, {overwrite: true});
          });


 
        }
      }).catch((err) => { 
        console.log(err);
      }
      );
      
         

  }
  }