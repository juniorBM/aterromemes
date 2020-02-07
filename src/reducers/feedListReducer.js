import { FEED_LIST } from '../actions'


export default function feedReducer(state = [], action) {
    switch (action.type) {
        case FEED_LIST:
            // [ ...this.state.data, ...repositories.items ],
            // console.log(action.feeds);
            
            // const newState = [ ...state, ...action.feeds ];
            // return [...state, action.feeds];
            return [ ...state, ...action.feeds ];
            // return action.feeds;
        default:
            return state;
    }
}