const cheerio = require('cheerio');
const phantom = require('phantom');
const colors = require('colors');
const pool = require('./postgres.js');

let lastRequest;
let savedData = [];

const controller = {
  getStocks: async function (cb) {
    pool.connect(async (error, client, done) => {
      if (error) return console.log(`getStocks ${error.message}`.red);
      console.log('Retrieving stocks...'.yellow);
      const result = await client.query('SELECT * FROM scraper;');
      if (result.rows.length !== 0) {
        cb(result.rows);
      } else {
        cb(void 0);
      }
      console.log('Done retrieving stocks...'.green);
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
      console.log('Scraper table cleared...'.red);
      await client.query('DELETE FROM scraper');
      done();
    });
  }
}

module.exports = controller;
