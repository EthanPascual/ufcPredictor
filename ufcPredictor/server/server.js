const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3000
require('dotenv').config()

const corsOptions = {
    origin: "http://localhost:5173"
}

app.use(cors(corsOptions))
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error("Connection error: ", err))

app.get('/testing', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})