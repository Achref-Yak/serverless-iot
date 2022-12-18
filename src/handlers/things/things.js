const AppError = require('../../utils/AppError');
const AppSuccess = require('../../utils/AppSuccess');


const ThingService = require('../../repository/thingService')



 
exports.create = async (event) => {


    const thing = new ThingService().createStack();

    if(thing)
    {
      return new AppSuccess(thing, 200).handleSuccess();
    }
    else return new AppError()




};