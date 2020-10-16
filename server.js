const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./todo.model');
const NoteModel = require('./note.model');
const UserModel = require('./user.model');

const PORT = 8080;
const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bucket1', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection eshtablished");
})

routes.route('/gettodos').get(function(req, res) {
    TodoModel.find(function(err, todos) {
        if (err) console.log(err);
        else res.json(todos);
        console.log(todos);
    })
})

routes.route('/update/:id').post(function(req, res) {
    TodoModel.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.isDone = req.body.isDone;
            console.log(req.body)
            todo.save().then(todo => {
                res.status(200).json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

routes.route('/edit-todo/:id').post(function(req, res) {
    TodoModel.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else {
            todo.heading = req.body.heading;
            todo.description = req.body.description;
            todo.dueDate = req.body.dueDate;
            console.log(req.body)
            todo.save().then(todo => {
                res.status(200).json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

routes.route('/delete-todo/:id').get(function(req, res) {
    TodoModel.remove({ _id: req.params.id }, function(err) {
        if (!err) {
            res.status(200).json('deleted');
        }
        else {
            res.status(400).json('error');
        }
    });
})

routes.route('/edit-note/:id').post(function(req, res) {
    NoteModel.findById(req.params.id, function(err, note) {
        if (!note)
            res.status(404).send("data is not found");
        else {
            note.user_id = req.body.user_id;
            note.heading = req.body.heading;
            note.description = req.body.description;
            note.save().then(note => {
                res.status(200).json('Note updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

routes.route('/delete-note/:id').get(function(req, res) {
    NoteModel.remove({ _id: req.params.id }, function(err) {
        if (!err) {
            res.status(200).json('deleted');
        }
        else {
            res.status(400).json('error');
        }
    });
})

routes.route('/addtodo').post(function(req, res) {
    var item = new TodoModel(req.body);
    console.log(item);
    item.save()
        .then (item => {
            res.status(200).json({'todo': item});
        })
        .catch(err => {
            res.status(400).send('adding todo failed');
        })
})

routes.route('/addnote').post(function(req, res) {
    var note = new NoteModel(req.body);
    console.log(note);
    note.save()
        .then (note => {
            res.status(200).json({'note': note});
        })
        .catch(err => {
            res.status(400).send('adding note failed');
        })
})

routes.route('/getnotes').get(function(req, res) {
    NoteModel.find(function(err, notes) {
        if (err) console.log(err)
        else res.json(notes);
    })
})

routes.route('/adduser').post(function(req, res) {
    var user = new UserModel(req.body);
    console.log(user);
    user.save()
        .then(user => {
            res.status(200).json({'user': user});
        })
        .catch(err => {
            res.status(400).send("adding user failed");
        })
})

routes.route('/getusers').get(function(req, res) {
    UserModel.find(function(err, users) {
        if (err) console.log(err)
        else res.json(users);
    })
})

app.use('/', routes);

app.listen(PORT, function() {
    console.log(`server listening at port ${PORT}`)
})