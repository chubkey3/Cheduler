const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    importance: {
        type: String, //0-3 0 not important 1 (!) important 2(!!) very important 3(!!!) emergency
    },
    description: {
        type: String
    },
    completiondate: {
        type: String
    }
     

})

module.exports = mongoose.model('Tasks', TaskSchema);