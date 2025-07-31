import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fightSchema from '../server/models/fightSchema.js';
import fighterSchema from '../server/models/fighterSchema.js';

let eventUrls = []
console.log("Loading.....")

try{
    const url = "http://www.ufcstats.com/statistics/events/completed?page=all"
    const response = await axios(url)
    const $ = cheerio.load(response.data)
    $(".b-statistics__table-col .b-statistics__table-content a").each((index, element) => {
        const href = $(element).attr('href')
        if(href){
            eventUrls.push(href)
        }
    })

} catch (err) {
    console.error("Problem Scraping Event URLS", err.message)
}

console.log("Event Urls done scraping")
eventUrls.shift() //removing first event, because that is their "up next" event, and hasn't happened yet
console.log("There are " + eventUrls.length + " events")
console.log(eventUrls[0])

let fightUrls = []
let counter = 0
for(const url of eventUrls){
    counter += 1;
    console.log("Scraping URL: " + counter)
    try {
        const response = await axios(url)
        const $ = cheerio.load(response.data)
        $(".b-fight-details__table-body tr").each((index, element) => {
            const href = $(element).attr('data-link')
            if(href){
                fightUrls.push(href)
            }
        })
    } catch (error) {
        console.error(`Scraping Failed for ${url}`, error.message)
    }

    await delay(1000)
}

console.log("Done Scraping Fight Urls")
console.log("There are " + fightUrls.length + " fights")
console.log(fightUrls[0])


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }