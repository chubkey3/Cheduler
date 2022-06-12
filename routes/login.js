const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Users = require('../models/User')

router.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password){
        const user = await Users.findOne({username: username});

        if (user){
            const valid = await bcrypt.compare(req.body.password, user.password);

            if(valid){
                const token = jwt.sign({
                    username: user.username
                },
                'secretkey')
                res.json(token);
            } else {
                res.sendStatus(401)
            }
            
        } else {
            res.sendStatus(404)
        }


    } else {
        res.sendStatus(400)
    }

    
})

module.exports = router;