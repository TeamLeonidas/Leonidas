const cheerio = require('cheerio');
const phantom = require('phantom');
const colors = require('colors');
const pool = require('./postgres.js');

let lastRequest;
let savedData = [];

const controller = {
  scraper: {
    getData: (req, res) => {
      console.log('Scraping...'.green);
      if (savedData.length && Date.now() - lastRequest < 300000) {
        return new Promise((resolve, reject) => {
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
          console.log(savedData);
          resolve(savedData);
        }).catch(err => console.error(`Error: ${err.message}`));
      })
    }
  },
  database: {
    getStocks: async function (symbol, cb) {
      pool.connect(async (error, client, done) => {
        const result = await client.query(`SELECT (s.symbol, s.name, s.last, s.change, s.percentChange, s.high, s.low, s.volume, s.avgVolume, s.time) FROM scraper s WHERE s.symbol = ('${symbol}');`);
        done();
        if (result.rows.length !== 0) {
          // const arr = result.rows[0].row.split(',');
          // arr[0] = arr[0].split('').filter((c, i) => i !== 0).join('');
          // arr[2] = arr[2].split('').filter((c, i, a) => i !== a.length - 1).join('');
          // const user = {};
          // user.id = arr[0];
          // user.name = arr[1];
          // user.avatar = arr[2];
          // user.stocks = arr[3];
          // cb(user);
        } else {
          cb(void 0);
        }
      });
    },
    postStocks: async function (id, name, avatar, cb) {
      pool.connect(async (error, client, done) => {
        await client.query(`INSERT INTO scraper (symbol, name, last, change, percentChange, high, low, volume, avgVolume, time) VALUES ('${symbol}', '${name}', '${last}, '${change}', '${percentChange}', '${high}', '${low}', '${volume}', '${avgVolume}', '${time}');`);
        const result = await client.query(`SELECT (s.symbol, s.name, s.last, s.change, s.percentChange, s.high, s.low, s.volume, s.avgVolume, s.time) FROM scraper s WHERE s.symbol = ('${symbol}');`);
        done();
        if (result.rows.length !== 0) {
          // const arr = result.rows[0].row.split(',');
          // arr[0] = arr[0].split('').filter((c, i) => i !== 0).join('');
          // arr[2] = arr[2].split('').filter((c, i, a) => i !== a.length - 1).join('');
          // const user = {};
          // user.id = arr[0];
          // user.name = arr[1];
          // user.avatar = arr[2];
          // cb(user);
        } else {
          cb(void 0);
        }
      });
    },
    clearStocks: async function (req, res, next) {
      pool.connect(async (error, client, done) => {
        await client.query('DELETE FROM scraper')
        done();
        next();
      });
    }
  }
}

module.exports = controller;
