const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));





app.listen(2000,() => console.log("server listening on port 2000"))
