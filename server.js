const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()
const UserRoutes = require("./routes/UserRoutes")
const {HandlingJsonSyntaxError,AuthMiddleware} = require("./middlewares")
const cookieparser = require("cookie-parser")

const app = express()
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));


//middlewares
app.use(express.json())
app.use(cookieparser())
app.use(HandlingJsonSyntaxError)
app.use(UserRoutes)
app.use(express.static(path.join(__dirname,'public')))
//middlewares


//templates endpoints
app.get('/register',(req,res) => {
    return res.sendFile(path.join(__dirname,'public','register.html'))
})

app.get('/login',(req,res) => {
    return res.sendFile(path.join(__dirname,'public','login.html'))
})


app.get('/tasks',AuthMiddleware,(req,res) => {
    return res.sendFile(path.join(__dirname,'public','index.html'))
})

//templates endpoints


app.listen(2000,() => console.log("server listening on port 2000"))
