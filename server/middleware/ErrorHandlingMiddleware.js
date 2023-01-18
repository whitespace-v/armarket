//error handling
const ApiError = require('../error/ApiError')                   //import API errors

module.exports = function (err, req, res, next){                //export function with (error, request, result, next())

    if (err instanceof ApiError){                                     //if error class = ApiError ->
        return res.status(err.status).json({message:err.message})      //res message with status code
    }
    return res.status(500).json({message:'Непредвиденная ошибка! :( '})       //untreated errors
}