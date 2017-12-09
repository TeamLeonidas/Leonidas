import * as types from '../constants/actionTypes';

// let myStocks = [];
let stockList = {};

const initialState = {
  userId: '',
  searchSymbol: '',
  // myStocks: myStocks,
  stockList: stockList,
};

const today = new Date();
const day = today.getDay();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if (day === 6) dd -= 1;
if (day === 0) dd -= 2;
if (dd < 10) dd = `0${dd}`;
if (mm < 10) mm = `0${mm}`;
const todaysDate = `${yyyy}-${mm}-${dd}`;

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INPUT_CHANGE:
      return Object.assign({}, state, {
        searchSymbol: action.payload,
      });

    case types.GET_USERINFO:
      console.log(action.payload.id);
      return Object.assign({}, state, {
        userId: action.payload.id,
      });

    case types.GET_STOCKINFO:
      if (!action.payload['Error Message']) {
        const stockSymbol = action.payload['Meta Data']['2. Symbol'];
        const stockObj = action.payload['Time Series (Daily)'][todaysDate];
        const stockInfo = {
          open: stockObj['1. open'],
          close: stockObj['4. close'],
          high: stockObj['2. high'],
          low: stockObj['3. low'],
          volume: stockObj['5. volume'],
        };
        // console.log('response is: ', stockObj);
        stockList = Object.assign({}, state.stockList);
        stockList[stockSymbol] = stockInfo;
        console.log(stockList);
        return Object.assign({}, state, {
          stockList,
          searchSymbol: '',
        });
      }
      return Object.assign({}, state, {
        searchSymbol: '',
      });

    default:
      return state;
  }
};

export default mainReducer;
