import { combineReducers } from 'redux';
import userReducer from './userReducer';
import feedListReducer from './feedListReducer';

export default combineReducers({
    user: userReducer,
    feeds: feedListReducer,
});