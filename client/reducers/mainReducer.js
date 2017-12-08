import * as types from '../constants/actionTypes';

let topStocks = [];
let stockList = [];

const initialState = {
  searchSymbol: '',
  topStocks: topStocks,
  stockList: stockList,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INPUT_CHANGE:
      return Object.assign({}, state, {
        searchSymbol: action.payload,
      });

    case types.SEARCH_STOCK:
      console.log('response is: ', action.payload['Time Series (30min)']);

    default:
      return state;
  }
};

export default mainReducer;
