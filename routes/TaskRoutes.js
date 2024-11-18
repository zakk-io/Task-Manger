const express = require("express")
const router = express.Router()
const TasksControllers = require("../controllers/TasksControllers")
const {HandlingJsonSyntaxError,AuthMiddleware} = require("../middlewares")

//Middleware
router.use(AuthMiddleware)
//Middleware

router.post("/api/tasks",TasksControllers.CreateTask)


module.exports = router