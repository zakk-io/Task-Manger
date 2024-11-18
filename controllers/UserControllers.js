const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require("../models/users")



//register
//Regex
const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//Regex
const Register = async (req,res) => {
    try {

        if(!passwordValidationRegex.test(req.body.password)){
            return res.status(400).json({
                status : 400,
                successful : false,
                error : "password policy violation",
                message : "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, a special character (e.g., !, @, #, $), and have no spaces."
            })
        }

        const clean_data = {
            username : xss(req.body.username),
            email : xss(req.body.email),
            password : await bcrypt.hash(req.body.password,10)
        }
        
        const data = await new Users(clean_data)
        const user = await data.save()

        return res.redirect("/login")
        
    } catch (error) {
        const ErrorObject = {
            status : 400,
            successful : false,
            error : error.name,
            message : error._message,
            body : error.message
        }

        if(error.name === "ValidationError"){
            return res.status(400).json(ErrorObject)
        }

        else if(error.code === 11000){
            const ErrorObject = {
                status : 400,
                successful : false,
                error : "duplicate value error",
                message : "email address already used",
                body : error.keyValue,
            }
            return res.status(400).json(ErrorObject)
        }
        res.status(500).json(error)
    }
}
//register


module.exports = {
    Register,
}