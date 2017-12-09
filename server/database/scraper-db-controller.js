const cheerio = require('cheerio');
const phantom = require('phantom');
const colors = require('colors');
const pool = require('./postgres.js');

let lastRequest;
let savedData = [];

const controller = {
  getStocks: async function (symbol) {
    pool.connect(async (error, client, done) => {
      if (error) return console.log(`getStocks ${error.message}`.red);
      console.log('Retrieving scraped data...'.yellow);
      const result = await client.query(`SELECT (s.symbol, s.name, s.last, s.change, s.percentChange, s.high, s.low, s.volume, s.avgVolume, s.time) FROM scraper s WHERE s.symbol = ('${symbol}');`);
      console.log('Done getting stocks...'.green);
      done();
    });
  },
  postStocks: async function (data) {
    pool.connect(async (error, client, done) => {
      if (error) return console.log(`postStocks ${error.message}`.red);
      console.log('Adding data to scraper table...'.yellow);
      await data.forEach(stock => {
        client.query(`INSERT INTO scraper (symbol, name, last, change, percentChange, high, low, volume, avgVolume, time) VALUES ('${stock.symbol}', '${stock.name}', '${stock.last}', '${stock.change}', '${stock.percentChange}', '${stock.high}', '${stock.low}', '${stock.volume}', '${stock.avgVolume}', '${stock.time}');`);
      });
      console.log('Done posting stocks...'.green);
      done();
    });
  },
  clearStocks: async function (req, res) {
    pool.connect(async (error, client, done) => {
      if (error) return console.log(`clearStocks ${error.message}`.red);
      console.log('Clearing scraper table...'.red);
      await client.query('DELETE FROM scraper');
      console.log('Done deleting stocks...'.green);
      done();
    });
  }
}

module.exports = controller;
