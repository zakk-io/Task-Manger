const express = require("express")
const router = express.Router()
const TasksControllers = require("../controllers/TasksControllers")
const {HandlingJsonSyntaxError,AuthMiddleware,TaskRateLimit} = require("../middlewares")

//Middleware
router.use(AuthMiddleware)
//Middleware

router.post("/api/tasks",TaskRateLimit,TasksControllers.CreateTask)
router.get("/api/tasks",TasksControllers.ListTasks)
router.get("/api/tasks/:id",TasksControllers.GetTask)
router.delete("/api/tasks/:id",TasksControllers.DeleteTask)
router.put("/api/tasks/:id",TasksControllers.UpdateTask)




module.exports = router