
'use strict';

const AppError = require('../../utils/AppError');
const AppSuccess = require('../../utils/AppSuccess');

const UserService = require('../../repository/userService');




exports.authenticate = async (event) => {




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

  await new userService().signUp(event);
};
