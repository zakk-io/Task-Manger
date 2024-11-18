const express = require("express")
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")


router.post("/api/auth/register",UserControllers.Register)
router.post("/api/auth/login",UserControllers.Login)
router.get("/api/auth/logout",UserControllers.Logout)


module.exports = router