const express = require("express")
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")
const {LoginRateLimit,RegisterLimit} = require("../middlewares")






router.post("/api/auth/register",RegisterLimit,UserControllers.Register)
router.post("/api/auth/login",LoginRateLimit,UserControllers.Login)
router.get("/api/auth/logout",UserControllers.Logout)


module.exports = router