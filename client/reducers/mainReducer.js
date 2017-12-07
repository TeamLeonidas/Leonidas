import * as types from '../constants/actionTypes';

const initialState = {
    counter: 0,
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_COUNTER:
            return Object.assign({}, state, {
                counter: state.counter + 1,
            });
        default:
            return state;
    }
}

export default mainReducer;