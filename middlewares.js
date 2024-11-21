const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { json } = require("express")
require("dotenv").config()
const expressratelimit = require("express-rate-limit")

const HandlingJsonSyntaxError = (err,req,res,next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json({
            status : 400,
            successful : false,
            error : err.name,
            message : err.message,
            body : err.body

        })
    }
    return next
}


const AuthMiddleware = async (req,res,next) => {
    try {
        const token = req.cookies.JWT
        
        if(!token){
            return res.redirect("/login?message=loggin first")   
        }

        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECERET)
        req.user = payload
        console.log("user_id in AuthMiddleware" +req.user.id);
        next()

    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            return res.status(400).json({
                status : 400,
                successful : false,
                name : error.name,
                message : error.message

            })  
        }

        if(error.name === "TokenExpiredError"){
            return res.redirect("/login?message=session expired")
        }

        console.log(error);
        res.json(error)   
    }
}




const rateLimitHandler = (req,res) => {
    return res.status(429).json({
        status: 429,
        successful: false,
        message: "Rate limit exceeded. try again later",
    })
}

//login rate limit 
const LoginRateLimit = expressratelimit({
	windowMs: 1 * 60 * 1000, 
	limit: 10,
    standardHeaders: true,     
    legacyHeaders: false,
    handler : rateLimitHandler //call the function rateLimitHandler if Rate limit exceeded
})



//create task rate limit 
const TaskRateLimit = expressratelimit({
	windowMs: 1 * 60 * 1000, 
	limit: 30,
    standardHeaders: true,     
    legacyHeaders: false,
    keyGenerator: (req) => req.user.id, //rate limit by user id
    handler : rateLimitHandler //call the function rateLimitHandler if Rate limit exceeded
})

//create task rate limit 
const RegisterLimit = expressratelimit({
	windowMs: 5 * 60 * 60 * 1000, 
	limit: 5,
    standardHeaders: true,     
    legacyHeaders: false,
    handler : rateLimitHandler //call the function rateLimitHandler if Rate limit exceeded
})


module.exports = {
    HandlingJsonSyntaxError,
    AuthMiddleware,
    LoginRateLimit,
    TaskRateLimit,
    RegisterLimit
}