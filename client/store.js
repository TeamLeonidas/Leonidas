import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';

// Application reducers
import mainReducer from './reducers/mainReducer';

const rootReducer = combineReducers({
    // Add reducers here
    main: mainReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;