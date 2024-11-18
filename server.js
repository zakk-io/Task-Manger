const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const UserRoutes = require("./routes/UserRoutes")
const {HandlingJsonSyntaxError} = require("./middlewares")


const app = express()
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));


app.use(express.json())
app.use(HandlingJsonSyntaxError)
app.use(UserRoutes)



app.listen(2000,() => console.log("server listening on port 2000"))
