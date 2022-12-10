class AppSuccess {
    constructor(data, statusCode) {

        this.data = data;
        this.statusCode = statusCode;
    }

 
     handleSuccess() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.data),
        }
    }
}

module.exports = AppSuccess;
