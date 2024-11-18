const { string, types, bool, ref } = require("joi")
const mongoose = require("mongoose")
const validator = require("validator")




const TasksSchema = mongoose.Schema(
    {
        user_id :{
            type : mongoose.Types.ObjectId,
            ref : "Users",
            required: true
        },

        name : {
            type : String,
            required : true,
            maxlength : 255,
        },

        complate : {
            type : Boolean,
            required : true,
        }
    }
)


const Tasks = mongoose.model("Tasks",TasksSchema,"Tasks")
module.exports = Tasks