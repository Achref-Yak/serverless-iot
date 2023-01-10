class AppError  {
    constructor(message, statusCode) {

        this.statusCode = statusCode;
        this.message = message;

 
    }

    // error method
     handleCastErrorDB() {
        return {
            statusCode: this.statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
            body: JSON.stringify(
                {
                    message: this.message,
                },
            ),
        }
    }
}

module.exports = AppError;
