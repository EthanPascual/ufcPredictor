import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fighterSchema from '../server/models/fighterSchema.js';
import fightSchema from '../server/models/fightSchema.js';


dotenv.config()
const uri = process.env.MONGO_URI
await mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error("Connection error: ", err))

const Fighters = mongoose.model('Fighter', fighterSchema);
const Fights = mongoose.model('Fight', fightSchema);

let url = 'http://www.ufcstats.com/fight-details/6b8be0ee3e569ad2'
try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    let fighters = []

    $('.b-fight-details__persons.clearfix .b-fight-details__person').each((index, element) => {
        const name = $(element).find('.b-fight-details__person-name').text().trim()
        const result = $(element).find('.b-fight-details__person-status').text().trim()
        fighters.push([name, result])
    })
    let winner = null
    const fighter1 = await Fighters.findOne({ name:fighters[0][0] });
    if(!fighter1){
        console.warn('Fighter not found, skipping.');
    }
    const fighter1Id = fighter1._id;
    if(fighters[0][1].includes("W")){
        winner = fighter1._id;
    }

    const fighter2 = await Fighters.findOne({ name:fighters[1][0] });
    if(!fighter2){
        console.warn('Fighter not found, skipping.');
    }
    const fighter2Id = fighter2._id;
    if(fighters[1][1].includes("W")){
        winner = fighter2._id;
    }

    const method = $('.b-fight-details__text-item_first i').next().text().trim()

    const fightDetails = []
    $('.b-fight-details__text-item ').each((index, element) => {
        const value = $(element).contents().filter(function() {
            return this.type === 'text';
        }).text().trim();
        fightDetails.push(value)
    })

    const round = parseInt(fightDetails[0])
    let timeString = fightDetails[1]
    const time = parseInt(timeString.split(":")[0]) * 60 + parseInt(timeString.split(":")[1]) 

    const fightStatistics = []
    $('.b-fight-details__table-body .b-fight-details__table-col .b-fight-details__table-text').each((index, element) => {
        const stat = $(element).text().trim()
        fightStatistics.push(stat)
    })
    for (let i = 0; i < fightStatistics.length; i++) {
        if (fightStatistics[i] === "---") {
            fightStatistics[i] = "0%";
        }
    }
    const KD1 = parseInt(fightStatistics[2])
    const KD2 = parseInt(fightStatistics[3])
    const sigStr1 = parseInt(fightStatistics[4].split(" of ")[0])
    const sigStr2 = parseInt(fightStatistics[5].split(" of ")[0])
    const sigStrP1 = parseInt(fightStatistics[6].substring(0, fightStatistics[6].indexOf('%')))
    const sigStrP2 = parseInt(fightStatistics[7].substring(0, fightStatistics[7].indexOf('%')))
    const totalStr1 = parseInt(fightStatistics[8].split(" of ")[0])
    const totalStr2 = parseInt(fightStatistics[9].split(" of ")[0])
    const TD1 = parseInt(fightStatistics[10].split(" of ")[0])
    const TD2 = parseInt(fightStatistics[11].split(" of ")[0])
    const TDP1 = parseInt(fightStatistics[12].substring(0, fightStatistics[12].indexOf('%')))
    const TDP2 = parseInt(fightStatistics[13].substring(0, fightStatistics[13].indexOf('%')))
    const subAtt1 = parseInt(fightStatistics[14])
    const subAtt2 = parseInt(fightStatistics[15])
    const rev1 = parseInt(fightStatistics[16])
    const rev2 = parseInt(fightStatistics[17])
    const ctrl1 = parseInt(fightStatistics[18].split(":")[0]) * 60 + parseInt(fightStatistics[18].split(":")[1])
    const ctrl2 = parseInt(fightStatistics[19].split(":")[0]) * 60 + parseInt(fightStatistics[19].split(":")[1])

    const existing = Fights.findOne({fighter1: fighter1Id, fighter2: fighter2Id, date: date})
    if(existing){
        console.warn("Fight already created, skipping")
    }

    const fightObject = {
        fighter1: fighter1Id,
        fighter2: fighter2Id,
        winner: winner,
        round: round,
        time: time,
        KD1: KD1, 
        sigStr1: sigStr1,
        sigStrP1: sigStrP1,
        totalStr1: totalStr1,
        TD1: TD1,
        TDP1: TDP1,
        subAtt1: subAtt1,
        rev1: rev1,
        ctrl1: ctrl1,
        KD2: KD2, 
        sigStr2: sigStr2,
        sigStrP2: sigStrP2,
        totalStr2: totalStr2,
        TD2: TD2,
        TDP2: TDP2,
        subAtt2: subAtt2,
        rev2: rev2,
        ctrl2: ctrl2,
        method: method,
        date: "testing"
    };
    await Fights.create(fightObject)
        .then(() => console.log("fight added"))
        .catch((err) => console.error("Error inserting fight:", err));
} catch (error) {
    console.error(`Error Scraping ${url}: `, error.message)
}
