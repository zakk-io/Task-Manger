const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require("../models/users")
require("dotenv").config()


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


//login
const Login = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
    
        if(!email || !password){
            return res.status(400).json({
                status : 400,
                successful : false,
                message : "credentials not provided"
            }) 
        }
        
    
        if (typeof password !== 'string') {
            return res.status(400).json({
                status: 400,
                successful: false,
                message: "Password must be a string value"
            });
        }
        
        const user = await Users.findOne({email})
        if(user){
          if(await bcrypt.compare(password,user.password)){
            const paylod = {
                id : user._id,
                username : user.username,
                email : user.email,
                create_at : new Date().getTime()
            }

            const token = jwt.sign(paylod,process.env.ACCESS_TOKEN_SECERET,{expiresIn:"7d"})

            res.cookie("JWT",token,{httpOnly:true,secure:false,maxAge: 7 * 24 * 60 * 60 * 1000,})//secure:true in production
            return res.status(200).json({
                status : 200,
                successful : true,
                message : "login successfully",
                access_token : token
            }) 
          }
        }

        return res.status(401).json({
            status : 401,
            successful : false,
            message : "invalid credentials"
        }) 
  
    } catch (error) {
        const ErrorObject = {
            status : 400,
            successful : false,
            error : error.name,
            message : error.message,
        }

        if(error.name === "CastError"){
            return res.status(400).json(ErrorObject)
        }
        console.log(error);
        res.status(500).json(error)
    }
}
//login

//login

const Logout = (req,res) => {
    res.clearCookie("JWT") //set JWT cookie to empty in the response JWT=; clear cookie from the browser
    return res.redirect("/login")
}



module.exports = {
    Register,
    Login,
    Logout,
}