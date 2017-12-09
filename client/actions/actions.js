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

const getUserInfo = response => ({
  type: types.GET_USERINFO,
  payload: response,
});

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
      .then(function(response) {
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

const addToDb = function () {
  return function (dispatch, getState) {
    const { searchSymbol, userId } = getState().main;
    // console.log('searchSymbol', searchSymbol, 'userId', userId);
    return fetch(`https://localhost:3000/stocks/update/${searchSymbol}/${userId}`)
      .then(response => response.json())
      .catch(err => console.log(err));
  };
};

const handleKeyPress = function (event) {
  return function (dispatch, getState) {
    if (event.charCode === 13) {
      if (getState().main.userId) dispatch(addToDb());
      dispatch(searchStock());
    }
  };
};



module.exports = {
  inputChange,
  getStockInfo,
  searchStock,
  handleKeyPress,
  retrieveUserInfo,
  getNews,
};
