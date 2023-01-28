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
        
        const { id, gaz, timestamp, analogSensorData } = sensorData;

        // update or create new sensor data
        return this.dbInstance.get({ id: id }).then(data => {

            if (!data) {
                console.log(analogSensorData);
                const newSensor = new this.dbInstance({
                    "id": id,
                    "thingName": "myThing",
                    "gaz": gaz,
                    "timestamp": timestamp,
                    "analogSensorData": 
                    {
                        "temperature": analogSensorData.temperature,
                    }

                });

                return newSensor.save();
            }
            else {
                console.log(data);
                // create day of from t imestamp
                const date = data.timestamp;
                const day = new Date(date);

                //convert timestamp to string 




                // id current day is newer than day from db
                const today = new Date(timestamp.toString());
                console.log(today + "-" + date);
                if (today > day) {

                    const newSensor = new this.dbInstance({
                        "id": id,
                        "thingName": "myThing",
                        "gaz": gaz,
                        "timestamp": timestamp,
                        "analogSensorData": analogSensorData
                    });

                    return newSensor.save();
                } else if (today === day && parseInt(gaz) > parseInt(data.gaz)) {

                    // UPDATE SENSOR VALUE
                    return this.dbInstance.update({ id: '1' }, { gaz: gaz });

                }
                return Promise.reject('Gaz is not greater than old gaz');
            }



        }).catch(err => {
            console.log(err);
        })






    }


}