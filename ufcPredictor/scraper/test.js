import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'http://www.ufcstats.com/fighter-details/193b9d1858bc4df3';

const response = await axios.get(url)
const $ = cheerio.load(response.data)

console.log("testing")
const header = $('h2').text()

console.log(header)
