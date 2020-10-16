const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Note = new Schema({
    user_id: {
        type: String
    },
    heading: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Note', Note)