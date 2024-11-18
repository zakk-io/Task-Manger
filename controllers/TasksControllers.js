const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss")
const Tasks = require("../models/tasks")
require("dotenv").config()



//Create Task

const CreateTask = async (req,res) => {
    try {
        const {name,complate} = req.body
        
        console.log("user_id in CreateTask" + req.user.id);        

        const data = await new Tasks({
            user_id : req.user.id,
            name : xss(name),
            complate : complate
        })

        const task = await data.save()
        return res.status(201).json({
            status: 201,
            successful: true,
            message: "Task Created successfully",
            task
        })

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

       console.log(error);
       res.json(error)   
    }
}

//Create Task


module.exports = {
    CreateTask,
}