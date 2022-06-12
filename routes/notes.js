const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Notes = require('../models/Notes');

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

        if (username){
            const notes = await Notes.findOne({username: username});
            res.json(notes);
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
            var notes = await Notes.findOne({username: username});
            var valid = true;
            if (notes !== null){
                notes = notes.notes;

                for (k of notes){
                    if (k.title === req.body.title){
                        valid = false;
                    }
                }
                
                if (valid){
                    notes.push({title: req.body.title, body: req.body.body})

                    const note = await Notes.updateOne({username: username}, {
                        $set: {
                            notes: notes
                        }
                    })
                
                    res.sendStatus(200);
                } else {
                    res.send('title already exists!')
                }
                
            } else {
                const notes = new Notes({
                    username: username,
                    notes: [{
                        title: req.body.title,
                        body: req.body.body
                    }]
                })
    
                const savedNotes = await notes.save();
    
                res.json(savedNotes);
            }
            
        } else {
            res.sendStatus(404);
        }
        
    } catch(err){
        res.sendStatus(400);
    }
})

router.delete('/', async(req, res) => {
    try {
        const username = auth(req.header("access-token"));

        if(username){
            var notes = await Notes.findOne({username: username});
            notes = notes.notes;
            notes = notes.filter(item => item.title !== req.body.title)
            
            const note = await Notes.updateOne({username: username}, {
                $set: {
                    notes: notes
                }
            })
            
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
        
    } catch(err){
        res.sendStatus(404);
    }
})

router.patch('/', async (req, res) => {
    try {
        const username = auth(req.header("access-token"));

        if(username){
            var notes = await Notes.findOne({username: username});
            if (notes !== null){
                notes = notes.notes;

               for (let i = 0; i<notes.length; i++){
                   if (notes[i].title === req.body.title){
                       notes[i].body = req.body.body;
                   }
               }

                const note = await Notes.updateOne({username: username}, {
                    $set: {
                        notes: notes
                    }
                })
            
                res.sendStatus(200);
            }
                
        } else {
            res.sendStatus(404);
        }
        
    } catch(err){
        res.sendStatus(400);
    }
})

module.exports = router;