import {
    combineReducers
} from 'redux';
import noticesReducer from './noticesReducer'

const rootReducer = combineReducers({
    noticesReducer,
});

export default rootReducer;