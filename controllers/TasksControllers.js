const express = require("express")
const mongoose = require("mongoose")
const xss = require("xss")
const Tasks = require("../models/tasks")
require("dotenv").config()



//Create Task

const CreateTask = async (req,res) => {
    try {
        const {name,complate} = req.body
               

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


//list task
const ListTasks = async (req,res) => {
    try {
        const tasks = await Tasks.find({user_id:req.user.id})
        
        if(tasks.length === 0){
            return res.status(404).json({
                status: 404,
                successful: false,
                message: "No Tasks for Now",
            })
        }

        return res.status(200).json({
            status: 200,
            successful: true,
            tasks
        })

    } catch (error) {
        console.log(error);
        res.json(error)    
    }
}
//list task



//get single task
const GetTask = async (req,res) => {
    try {
        const task_id = req.params.id
        const task = await Tasks.findOne({_id : task_id , user_id : req.user.id}) 

        if(!task){
            return res.redirect("/tasks?message=No Task Found With This id")
        }

        return res.status(200).json({
            status: 200,
            successful: true,
            task
        })
    } catch (error) {
        if(error.name === "CastError"){
            return res.redirect("/tasks?message=No Task Found With This id")
        }

        console.log(error);
        res.json(error) 
    }
}
//get single task


//update task
//update task


//delet taskk
const DeleteTask = async (req,res) => {
    try {
        const task_id = req.params.id
        
        const task = await Tasks.findOne({_id : task_id , user_id : req.user.id}) 
        
        if(!task){
            return res.status(404).json({
                status: 404,
                successful: false,
                message: "task not found",
            })            
        }

        await Tasks.deleteOne({_id : task_id})
        return res.status(200).json({
            status: 200,
            successful: true,
            message : "task deleted successfully"
        })

    } catch (error) {
        if(error.name === "CastError"){
            return res.status(404).json({
                status: 404,
                successful: false,
                message: "task not found",
            })
        }

        console.log(error);
        res.json(error)  
    }

}
//delet taskk

module.exports = {
    CreateTask,
    ListTasks,
    DeleteTask,
    GetTask
}