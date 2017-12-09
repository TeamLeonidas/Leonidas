const cheerio = require('cheerio');
const phantom = require('phantom');
const colors = require('colors');
const pool = require('./postgres.js');

// Scraper variables
let lastRequest;
let savedData = [];

const controller = {
  getData: (req, res) => {
    console.log('Scraping...'.green);
    if (savedData.length && Date.now() - lastRequest < 300000) {
      return new Promise((resolve, reject) => {
        console.log('Serving saved data...'.magenta);
        res.send(savedData);
      });
    }
    lastRequest = Date.now();
    return new Promise((resolve, reject) => {
      const output = [];

      async function barChart() {
        console.log('Scraping barchart...'.cyan);
        const instance = await phantom.create();
        const page = await instance.createPage();

        await page.open('https://www.barchart.com/stocks/performance/percent-change');

        const content = await page.property('content');
        const $ = cheerio.load(content);

        $('.odd').map((idx, elem) => {
          const listing = {};
          listing.symbol = $(elem).attr('data-current-symbol');
          listing.name = $(elem).find('.symbolName > div > span > span > span').text();
          listing.last = $(elem).find('.lastPrice > div > span > span > span').text();
          listing.change = $(elem).find('.priceChange > div > span > span > span').text();
          listing.percentChange = $(elem).find('.percentChange > div > span > span > span').text();
          listing.high = $(elem).find('.highPrice > div > span > span > span').text();
          listing.low = $(elem).find('.lowPrice > div > span > span > span').text();
          listing.volume = $(elem).find('.volume > div > span > span > span').text();
          listing.avgVolume = $(elem).find('.averageVolume > div > span > span > span').text();
          listing.time = $(elem).find('.tradeTime > div > span > span > span').text();
          output.push(listing);
        });

        await instance.exit();
      }

      barChart().then(() => {
        console.log('Scrape complete'.rainbow);
        savedData = output;
        resolve(savedData);
      }).catch(err => console.error(`Error: ${err.message}`));
    })
  }
}

module.exports = controller;
