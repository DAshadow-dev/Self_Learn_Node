const { constants} = require('../../constants');
const errorHandler = (err, req, res, next) =>{
    const statusCode = err.statusCode ? err.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title : 'Validation Error',
                message: err.message,
                stackTrace : err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title : 'Not Found',
                message: err.message,
                stackTrace : err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title : 'Forbidden',
                message: err.message,
                stackTrace : err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title : 'Unauthorized',
                message: err.message,
                stackTrace : err.stack
            })
            break;
        case constants.NOT_ACCEPTABLE:
            res.json({
                title : 'Not Acceptable',
                message: err.message,
                stackTrace : err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                title : 'Server Error',
                message: 'An unexpected error occurred',
                stackTrace : err.stack
            })
            break;    
        default:
            console.log("NO error occurred");
            
            break;
    }
}

module.exports = errorHandler;