class AppSuccess {
    constructor(data, statusCode) {

        this.data = data;
        this.statusCode = statusCode;
    }

 
     handleSuccess() {
        return {
            statusCode: this.statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(this.data),
        }
    }
}

module.exports = AppSuccess;
