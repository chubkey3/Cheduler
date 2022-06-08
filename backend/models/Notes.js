const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    username: {
        type: String,
    },
    notes: [{
        title: {
            type: String
        },
        body: {
            type: String
        }
    }]
     

})

module.exports = mongoose.model('Notes', NotesSchema);