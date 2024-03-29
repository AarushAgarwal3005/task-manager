const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')


require("dotenv").config()
require('./db')
const PORT = 9000


app.use(bodyParser.json());
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'task manager is working '
    });

})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
})