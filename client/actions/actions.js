import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';
import * as keys from './../../config/keys';

const inputChange = value => ({
  type: types.INPUT_CHANGE,
  payload: value,
});

const getStockInfo = response => ({
  type: types.GET_STOCKINFO,
  payload: response,
});


const searchStock = function () {
  return function (dispatch, getState) {
    const timeSeries = 'TIME_SERIES_DAILY';
    const { searchSymbol } = getState().main;
    return fetch(`https://www.alphavantage.co/query?function=${timeSeries}&symbol=${searchSymbol}&interval=30min&apikey=${keys.STOCKAPI_KEY}`)
      .then(response => response.json())
      .then(json => dispatch(getStockInfo(json)))
      .catch(err => console.log(err));
  };
};

const getNews = function (str) {
  return function (dispatch, getState) {
    let date = new Date()
    date = date.getFullYear() + '-' + date.getMonth() + '-' + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate())

    const url = 'https://newsapi.org/v2/everything?' +
              `sources=${keys.NEWSAPI_SOURCES}&` +
              `q=${str}&` +
              `from=${date}&` +
              'sortBy=popularity&' +
              `apiKey=${keys.NEWSAPI_KEY}`;

    return fetch(url)
      .then(function(response) {
        console.log('inside first promise')
        return response.json();
      })
    }
};

const searchStockBySym = function (symbol) {
  return function (dispatch, getState) {
    const timeSeries = 'TIME_SERIES_DAILY';
    return fetch(`https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&apikey=${keys.STOCKAPI_KEY}`)
      .then(response => response.json())
      .then(json => dispatch(getStockInfo(json)))
      .catch(err => console.log(err));
  };
};

// const searchStockBySym = function (symbol) {
//   return function (dispatch, getState) {
//     const timeSeries = 'TIME_SERIES_DAILY';
//     return fetch(`https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&apikey=${keys.STOCKAPI_KEY}`)
//       .then(response => response.json())
//       .then(json => dispatch(getStockInfo(json)))
//       .catch(err => console.log(err));
//   };
// };

const handleKeyPress = function (event) {
  return function (dispatch, getState) {
    if (event.charCode === 13) {
      // console.log('value in textfield is: ', getState().main.searchSymbol);

      dispatch(searchStock());
    }
  };
};



module.exports = {
  inputChange,
  getStockInfo,
  searchStock,
  handleKeyPress,
  getNews,
};
