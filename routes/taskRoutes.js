const express = require("express");

const router = express.Router();
const auth = require('../middlewares/auth')
const Task = require('../models/Task')

router.get('/test', auth, (req, res) => {
    res.json({
        message: 'task routes are working',
        User: req.User
    });

});
//CRUD tasks for auth users

//C R E A T E   U S E R    T A S K S 
router.post('/', auth, async (req, res) => {
    try {
        // description,completed....and owner will be extracted from req.User._id
        const task = new Task({
            ...req.body,
            owner: req.User._id

        })
        await task.save();
        res.status(201).json({ task, message: "task created successfully" })
    }
    catch (err) {
        res.status(400).send({ error: err })
    }

});//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

//G E  T    U S E R    T A S K S 
router.get('/', auth, async (req, res) => {
    try {
        // description,completed....and owner will be extracted from req.User._id
        const tasks = await Task.find({ owner: req.User._id })

        res.status(201).json({ tasks, count: tasks.length, message: "tasks fetched sussecfully" })
    }
    catch (err) {
        res.status(500).send({ error: err })
    }

})


//-----------------------------------------------------------------------------------------------------------------------------------------------------------

//fetch a task by id
router.get('/:id', auth, async (req, res) => {
    const taskid = req.params.id;
    try {
        const task = await Task.findOne({
            _id: taskid,
            owner: req.User._id
        })
        if (!task) {
            return res.status(400).json("No such task exists")
        }
        res.status(200).json({ task, message: "task fetched successfully" })
    }

    catch (err) {
        return res.status(400).json({ error: 'Task not found' });

    }
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
router.patch('/:id', auth, async (req, res) => {
    const taskid = req.params.id;
    const updates = Object.keys(req.body)
    const allowedupdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedupdates.includes)
    if (!isValidOperation) {
        return res.status(400).json('Invalid updates')
    }


    try {
        const task = await Task.findOne({
            _id: taskid,
            owner: req.User._id
        })
        if (!task) {
            return res.status(400).json("No such task exists")
        }

        updates.forEach(update => task[update] = req.body[update])

        task: await task.save(),
            res.json({ message: 'task updated successfully' })
    }

    catch (err) {
        return res.status(400).json({ error: 'Task not found' });

    }
})

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
    const taskid = req.params.id;



    try {
        const task = await Task.findOneAndDelete({
            _id: taskid,
            owner: req.User._id
        })
        if (!task) {
            return res.status(400).json("No such task exists")
        }
        res.status(200).json({ task, message: "task deleted successfully" })

    }

    catch (err) {
        return res.status(400).json({ error: 'Task not found' });

    }
})




module.exports = router;