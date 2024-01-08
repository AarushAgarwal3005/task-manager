const jwt = require('jsonwebtoken');
const user = require('../models/user');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');        //#bearer keyword so that we are able to know this is my token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const User = await user.findOne({
            _id: decoded._id,
        })
        if (!user) {
            throw new Error('unable to login,invalid credentials')
        }
        req.User = User;
        req.token = token;
        next()
    }
    catch (error) {
        res.status(401).send({error: error.message})
    }
}

module.exports=auth;