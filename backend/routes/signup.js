const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Users = require('../models/User')

router.post('/', async (req, res) => {
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);

    const checkuser = await Users.findOne({username: username});

    if (checkuser) {
        console.log(checkuser)
        res.sendStatus(400)
    } else {
        const user = new Users({
            username: username,
            password: password
        })
    
        try {
            const savedUser = await user.save();
            //res.json(savedUser);
            res.sendStatus(200);
        } catch(err){
            console.log(err)
            res.sendStatus(409)
        }
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await Users.find();
        res.json(user);
    } catch(err){
        res.sendStatus(404)
    }
})

router.delete('/', async (req, res) => {
    try {
        const user = await Users.deleteOne({username: req.body.username})
        res.json(user);
    } catch(err){
        res.sendStatus(404)
    }
})

module.exports = router;