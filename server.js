const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const tasksRoute = require('./routes/tasks')
const loginRoute = require('./routes/login')
const signupRoute = require('./routes/signup')
const notesRoute = require('./routes/notes')

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hi');
})

//app.use('/calender', dataRoute) //calender data
app.use('/tasks', tasksRoute) //list of tasks and information about each one
app.use('/login', loginRoute)
app.use('/signup', signupRoute)

app.use('/notes', notesRoute)

//non unique tasks/accounts/notes by mapping them to their database ids in a seperate collection
//app.use('/account') //could split this up into name, email, password, etc

//tasks could be the general list and calender is just a visualizer???

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Chubkey:booman3000@images.v2rim.mongodb.net/?retryWrites=true&w=majority');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT);