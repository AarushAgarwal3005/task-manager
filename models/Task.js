const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,  //specific type of id that mongodb provides
        ref: "user", //refers to the model name User in this case
        required: true
    }
},
{
    timestamps:true
})



const Task = mongoose.model('Task', taskSchema);
module.exports = Task;