import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';
import * as keys from './../../config/keys';

const inputChange = value => ({
  type: types.INPUT_CHANGE,
  payload: value,
});

const searchStock = response => ({
  type: types.SEARCH_STOCK,
  payload: response,
});


const onSubmit = function () {
  return function (dispatch, getState) {
    const { searchSymbol } = getState().main;
    // console.log(searchSymbol);
    // const request = new Request(`http://localhost:3000/api/articles/?q=${stateText}`);
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${searchSymbol}&interval=30min&apikey=${keys.STOCKAPI_KEY}`)
      .then(response => response.json())
      .then(json => dispatch(searchStock(json)))
      .catch(err => console.log(err));
  };
};

const handleKeyPress = function (event) {
  return function (dispatch, getState) {
    if (event.charCode === 13) {
      // console.log('keypressed', event);
      console.log('value in textfield is: ', getState().main.searchSymbol);
      dispatch(onSubmit());
    }
  };
};

module.exports = {
  inputChange,
  searchStock,
  onSubmit,
  handleKeyPress,
};
