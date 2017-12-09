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

const getTopStockData = response => ({
  type: types.GET_TOPSTOCKS,
  payload: response,
});

const getUserInfo = response => ({
  type: types.GET_USERINFO,
  payload: response,
});

const getMyStocks = response => ({
  type: types.GET_MYSTOCKS,
  payload: response,
});

const retrieveMyStocks = function () {
  return function (dispatch, getState) {
    const { userId } = getState().main;
    if (userId) {
      return fetch(`/stocks/get/${userId}`)
        .then(response => response.json())
        .then(stocks => dispatch(getMyStocks(stocks)))
        .catch(err => console.log(err));
    }
  };
};

const retrieveUserInfo = function () {
  return function (dispatch, getState) {
    return fetch('/auth', { credentials: 'include' })
      .then(response => response.json())
      .then(user => dispatch(getUserInfo(user)))
      .catch(err => console.log(err));
  };
};

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
      .then(function (response) {
        return response.json();
      })
  }
};

const searchForMyStocks = function () {
  return function (dispatch, getState) {
    const { myStocks } = getState().main;
    const timeSeries = 'TIME_SERIES_DAILY';
    myStocks.forEach((symbol) => {
      return fetch(`https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&apikey=${keys.STOCKAPI_KEY}`)
        .then(response => response.json())
        .then(json => dispatch(getStockInfo(json)))
        .catch(err => console.log(err));
    });
  };
};

const addToDb = function () {
  return function (dispatch, getState) {
    const { searchSymbol, userId } = getState().main;
    return fetch(`/stocks/update/${searchSymbol}/${userId}`)
      .then(() => console.log(`${searchSymbol} added to database`))
      .catch(err => console.log(err));
  };
};

const handleKeyPress = function (event) {
  return function (dispatch, getState) {
    if (event.charCode === 13) {
      dispatch(searchStock());
      if (getState().main.userId) dispatch(addToDb());
    }
  };
};

const getTopStocks = function () {
  return function (dispatch) {
    return fetch('/topstocks')
      .then(response => response.json())
      .then(json => dispatch(getTopStockData(json)))
      .catch(err => console.log(err));
  };
};


module.exports = {
  inputChange,
  getStockInfo,
  searchStock,
  handleKeyPress,
  retrieveUserInfo,
  getNews,
  getTopStocks,
  getMyStocks,
  retrieveMyStocks,
  searchForMyStocks,
};
