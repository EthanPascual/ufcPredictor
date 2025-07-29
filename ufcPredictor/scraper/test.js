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

try{
    const url = 'http://www.ufcstats.com/fighter-details/72db2a14ffa73ece';

const response = await axios.get(url)
const $ = cheerio.load(response.data)

let name = $('.b-content__title .b-content__title-highlight').text().trim()
let record = $('.b-content__title .b-content__title-record').text().trim().substring(8)
if(record.indexOf("(") != -1){
    record = record.substring(0, record.indexOf("(") - 1);
}
let recordList = record.split('-')
let wins = parseInt(recordList[0])
let losses = parseInt(recordList[1])
let draw = parseInt(recordList[2])
let nickname = $('.b-content__Nickname').text().trim()

let listItems = $('.b-list__box-list li')
let basicStats = []

listItems.each((i, element) => {
    let itemText = '';
  $(element).contents().each((i, child) => {
    // Check if the child is a text node (nodeType 3) or an element that is not an <i> tag
    if (child.nodeType === 3) {
      itemText += $(child).text();
    } else if (child.nodeType === 1 && child.tagName !== 'i') {
      itemText += $(child).text();
    }
  });
  basicStats.push(itemText.trim());
})

let heightString = basicStats[0]
let height = 0;
if (heightString.includes("'") && heightString.includes('"')) {
    const feet = parseInt(heightString.split("'")[0]);
    const inches = parseInt(heightString.split("'")[1]);
    height = feet * 12 + inches;
}
let weight = parseInt(basicStats[1].substring(0, basicStats[1].indexOf(" lbs.")))
let reach = parseInt(basicStats[2].substring(0, basicStats[2].indexOf('"')))
let stance = basicStats[3]
let DOB = basicStats[4]
let SLpM = parseFloat(basicStats[5])
let StrAcc = parseInt(basicStats[6].substring(0, basicStats[6].indexOf("%")))
let SApM = parseFloat(basicStats[7])
let StrDef =  parseInt(basicStats[8].substring(0, basicStats[8].indexOf("%")))
let TDAvg = parseFloat(basicStats[10])
let TDAcc = parseInt(basicStats[11].substring(0, basicStats[11].indexOf("%")))
let TDDef = parseInt(basicStats[12].substring(0, basicStats[12].indexOf("%")))
let SubAvg = parseFloat(basicStats[13])

const fighterObj = {
    name: name,
    nickname: nickname,
    height: height,
    weight: weight,
    reach: reach,
    stance: stance,
    DOB: DOB,
    SLpM: SLpM,
    StrAcc: StrAcc,
    SApM: SApM,
    StrDef: StrDef,
    TDAvg: TDAvg,
    TDAcc: TDAcc,
    TDDef: TDDef,
    SubAvg: SubAvg,
    wins: wins,
    losses: losses,
    draw: draw,
    image: 'no-profile-image.avif'
}

console.log(fighterObj)
await Fighters.create(fighterObj)
console.log("Fighter added")
} catch(err) {
    console.error("Scraping Failed: ", err.message)
}