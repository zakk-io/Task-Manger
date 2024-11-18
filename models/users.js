const mongoose = require("mongoose")
const validator = require("validator")


const UserSchema = mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            maxlength : 50,
        },

        email : {
            type : String,
            required : true,
            maxlength : 50,
            unique : true,
            validate : {
                validator : (value) => validator.isEmail(value), 
                message : "provide valid email address",
            }
        },

        password : {
            type : String,
            required : true,
            maxlength : 255,  
        }
    }
)

const Users = mongoose.model("Users",UserSchema,"Users")

module.exports = Users