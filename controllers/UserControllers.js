const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require("../models/users")



//register
const Register = async (req,res) => {
    try {
        const clean_data = {
            username : xss(req.body.username),
            email : xss(req.body.email),
            password : await bcrypt.hash(req.body.password,10)
        }
        
        const data = await new Users(clean_data)
        const user = await data.save()

        return res.status(201).json({
            status : 201,
            successful : true,
            user : user
        })
        
    } catch (error) {
        const ErrorObject = {
            status : 400,
            successful : false,
            error : error.name,
            message : error._message || error.type,
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
                message : "value must be unique",
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