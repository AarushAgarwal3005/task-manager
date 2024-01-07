const express = require("express");
const user = require('../models/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

router.get('/', (req, res) => {
    res.send('user routes are working');

});
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const User = await user({ name, email, password });
        await User.save()
        res.status(201).send({ User, message: 'user created successfully' })
    }
    catch (err) {
        res.status(400).send({ error: err })
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
            throw new Error('unable to login,user not found')

        }
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            throw new Error('Password incorrect')
        }
        const token=jwt.sign({
            _id : User._id.toString()
            },process.env.JWT_SECRET_KEY)
    
    res.send({User,token,message:"logged in successfully"})
        }
    catch (err) {
        res.sendStatus(400).send({ error: err })
    }

})


//register and login a user

module.exports = router;