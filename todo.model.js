const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    user_id: {
        type: String
    },
    heading: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    isDone: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);