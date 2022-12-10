class AppError  {
    constructor(message, statusCode) {

        this.statusCode = statusCode;
        this.message = message;

 
    }

    // error method
     handleCastErrorDB() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(
                {
                    message: this.message,
                },
            ),
        }
    }
}

module.exports = AppError;
