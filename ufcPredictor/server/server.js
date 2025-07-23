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

const fighterSchema = require('./models/fighterSchema');
const Fights = require('./models/fightSchema')

const Fighters = mongoose.model('Fighter', fighterSchema);

app.get('/fighters', async (req, res) => {
    let fighters = await Fighters.find({});
    res.send(fighters);
})

app.get('/fights', async (req, res) => {
    let fights = await Fights.find({});
    res.send(fights);
})

app.get('/fighters/:name', async (req, res) => {
    let fighter = await Fighters.findOne({name: req.params.name});
    res.send(fighter)
})

app.get('/fights/:id', async (req, res) => {
    let fight = await Fights.findById(req.params.id)
    res.send(fight)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})