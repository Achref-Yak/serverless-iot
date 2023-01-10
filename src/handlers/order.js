const Aws = require('aws-sdk');
const dynamoose = require("dynamoose");
const AppError = require('../utils/AppError');
const AppSuccess = require('../utils/AppSuccess');

const UtilsService = require('../repository/utilsService');
exports.orderByDate = async (event) => {

    return new UtilsService().orderByDate(event).then( data => {
 
        return new AppSuccess(data, 200).handleSuccess();
    }).catch(err => {
        return new AppError(err, 500).handleCastErrorDB();
    })

  
};


