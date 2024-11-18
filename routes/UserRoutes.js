const express = require("express")
const router = express.Router()
const UserControllers = require("../controllers/UserControllers")


router.post("/api/auth/register",UserControllers.Register)


module.exports = router