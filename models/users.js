const mongoose = require("mongoose")
const validator = require("validator")

//Regex
const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//Regex

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
            validate : {
                validator : (value) => passwordValidationRegex.test(value),
                message : "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, a special character (e.g., !, @, #, $), and have no spaces.",
            }  
        }
    }
)

const Users = mongoose.model("Users",UserSchema,"Users")

module.exports = Users