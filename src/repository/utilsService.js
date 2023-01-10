const Aws = require('aws-sdk');
const dynamoose = require("dynamoose");
const { resolve } = require('path');
const ThingSchema = require('../schemas/thingSchema');

module.exports = class UserService {

    dbInstance;
    constructor() {
        const tableName = 'testTable';
        this.dbInstance = dynamoose.model(tableName, ThingSchema);
    }


    orderByDate(sensorData) {
        const { gaz, timestamp } = sensorData;
 
      
        return this.dbInstance.get({ id: '1' }).then(data => {


            console.log(data);
            // create day of from t imestamp
            const date = data.timestamp;
            const day = new Date(date);

            //convert timestamp to string 




            // id current day is newer than day from db
            const today = new Date(timestamp.toString());
            console.log(today + "-" + date);
            if (today > day ) {

                const newSensor = new this.dbInstance({
                    "id": "2",
                    "thingName": "myThing",
                    "gaz": gaz,
                    "timestamp": timestamp
                });

                return newSensor.save();
            }else if(today === day && parseInt(gaz) > parseInt(data.gaz)){

                // UPDATE SENSOR VALUE
                return this.dbInstance.update({ id: '1' }, { gaz: gaz });

            }
            return Promise.reject('Gaz is not greater than old gaz');


        }).catch(err => {
            console.log(err);
        })






    }


}