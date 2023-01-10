
'use strict';

const AppError = require('../../utils/AppError');
const AppSuccess = require('../../utils/AppSuccess');

const UserService = require('../../repository/userService');




exports.authenticate = async (event) => {
  // check jwt token from header and return user data
  const { authorization } = event.headers;
  const token = authorization.split(' ')[1];

  const user = await new UserService().authenticate(token);
  



};

exports.authorize = async (event) => {


    return true; 

};


exports.login = async (event) => {

  console.log(event);

  const data = JSON.parse(event.body);
  const { email, password } = data;

  if (!email || !password) {
    return new AppError(data, 400).handleCastErrorDB();
  }


  const token = await new UserService().login(data);
 
  if (token)
    return new AppSuccess(token, 200).handleSuccess();
  else
    return new AppError('Bad credentials', 400).handleCastErrorDB();
 
};



exports.emailSignup =  async (event) => {
  console.log(event);

  await new UserService().signUp(event.body);
};
