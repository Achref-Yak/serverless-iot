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


exports.getSensorDataByThing = async (event) => {
    // get event path parameters into a const
 
    const {thingName}= event.pathParameters;

    return new ThingService().getSensorDataByThing(thingName).then( data => {
        console.log(data);
        return new AppSuccess(data, 200).handleSuccess();
    }).catch(err => {
        return new AppError(err, 500).handleCastErrorDB();
    })
};

 


exports.updateThing = async (event) => {
    // get event path parameters into a const 
    const { thingName } = event.pathParameters;

    new ThingService().updateThing(thingName).then( data => {

        return new AppSuccess(data, 200).handleSuccess();
    }).catch(err => {
        return new AppError(err, 500).handleError();
    })
};

exports.updateCertificateToThing = async (event) => {
    new ThingService().updateCertificate(event.body).then( data => {

        return new AppSuccess(data, 200).handleSuccess();
    }).catch(err => {
        return new AppError(err, 500).handleError();
    })
}


exports.getAllThings = async (event) => {
    return new ThingService().getAllThings().then( data => {
console.log(data);
        return new AppSuccess(data, 200).handleSuccess();
    }).catch(err => {
        return new AppError(err, 500).handleError();
    })
}

