const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Tasks = require('../models/Task')

function auth(token){
    try {
        const username = jwt.verify(token, 'secretkey').username;

        return username;
    } catch(err){
        return false;
    }
}

router.get('/', async (req, res) => {
    try {
        const username = auth(req.header("access-token"));

        if (auth){
            const tasks = await Tasks.find({username: username});
            res.json(tasks);
        } else {
            res.sendStatus(401)
        }
        
    } catch(err){
        res.sendStatus(400);
    }
})

router.post('/', async (req, res) => {
    try {
        
        const username = auth(req.header("access-token"));
        
        if(username){
            
            const notvalid = await Tasks.findOne({username: username, title: req.body.title})
            
            if (notvalid){
                res.sendStatus(403);
            } else {
                const task = new Tasks({
                    username: username,
                    title: req.body.title,
                    importance: req.body.importance,
                    description: req.body.description || '',
                    completiondate: req.body.completiondate || ''
                })
                
                const savedTask = await task.save();
                res.json(savedTask);
            }
        }
        
    } catch(err){
        console.log(req.body)
        res.sendStatus(400);
    }
})

router.patch('/', async (req, res) => {
    
    try {
        const username = auth(req.header("access-token"));
        
        if (username){

            const notvalid = await Tasks.findOne({username: username, title: req.body.newtitle})
            if (notvalid){
                const task = await Tasks.updateOne({username: username, title: req.body.oldtitle}, {$set: {
                    description: req.body.description,
                    importance: req.body.importance,
                    completiondate: req.body.completiondate
                }})
            }
            else {
                const task = await Tasks.updateOne({username: username, title: req.body.oldtitle}, {$set: {
                    title: req.body.newtitle,
                    description: req.body.description,
                    importance: req.body.importance,
                    completiondate: req.body.completiondate
                }})
            }
            res.sendStatus(200);
        }
    } catch(err){
        console.log(err)
        //res.sendStatus(400);
    }
})

router.delete('/', async(req, res) => {
    console.log(req.header("access-token"))
    try {
        const username = auth(req.header("access-token"));

        if (username){
            const task = await Tasks.deleteOne({title: req.body.title, username: username})

            res.json(task);
        }

    } catch(err){
        res.sendStatus(400);
    }
})

router.get('/day', async (req, res) => {
    console.log(req.query.date, req.query.month)
    try {
        const username = auth(req.header("access-token"));
        
        if (username){
            const task = await Tasks.find({username: username});
            var tasksonday = [];

            for (t of task){
                date = new Date(t.completiondate)
                console.log("query", req.query.date, req.query.month)
                console.log("actual", date.getDate(), date.getMonth()+1)
                if (date.getDate() === Number(req.query.date) && date.getMonth()+1 === Number(req.query.month)){
                    tasksonday.push(t)
                }
            }

            res.json(tasksonday);
        } else{
            res.sendStatus(401)
        }
    } catch(err){
        res.sendStatus(400);
    }
})

router.get('/days', async (req, res) => {
    try {
        const username = auth(req.header("access-token"));

        if (username){
            const tasks = await Tasks.find({username: username});
            tasks.forEach(function(task, index, array) {
                array[index] = array[index]['completiondate'];
            })
            
            res.json(tasks.filter((task) => task !== ''))
        } else {
            res.sendStatus(401)
        }
    } catch(err){
        res.sendStatus(400);
    }
})


router.get('/task', async (req, res) => {
    try {
        const username = auth(req.header("access-token"));

        if (auth){
            const tasks = await Tasks.findOne({username: username, title: req.body.title});
            res.json(tasks);
            if (tasks === null){
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401)
        }
        
    } catch(err){
        res.sendStatus(400);
    }
})

module.exports = router;