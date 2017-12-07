import * as types from '../constants/actionTypes';

const incrementCounter = () => ({
    type: types.INCREMENT_COUNTER
});

module.exports = {
    incrementCounter,
};