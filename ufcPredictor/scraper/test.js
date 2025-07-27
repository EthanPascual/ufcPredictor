import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fighterSchema from '../server/models/fighterSchema.js';


dotenv.config()
const uri = process.env.MONGO_URI
await mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error("Connection error: ", err))

const Fighters = mongoose.model('Fighter', fighterSchema);


const url = 'http://www.ufcstats.com/fighter-details/193b9d1858bc4df3';

const response = await axios.get(url)
const $ = cheerio.load(response.data)

console.log("testing")
let name = $('.b-content__title .b-content__title-highlight').text().trim()
let record = $('.b-content__title .b-content__title-record').text().trim().substring(8)
let recordList = record.split('-')
let wins = parseInt(recordList[0])
let losses = parseInt(recordList[1])
let draw = parseInt(recordList[2])
let nickname = $('.b-content__Nickname').text().trim()


/*
await Fighters.create({
    name: name,
    nickname: String,
    height: Number,
    reach: Number,
    stance: String,
    DOB: String,
    SLpM: Number,
    StrAcc: Number,
    SApM: Number,
    StrDef: Number,
    TDAvg: Number,
    TDAcc: Number,
    TDDef: Number,
    SubAvg: Number,
    wins: wins,
    losses: losses,
    draw: draw,
    image: 'no-profile-image.avif'

});

*/