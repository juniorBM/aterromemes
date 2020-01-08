import React from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(reduxThunk)
));

console.log(store.getState());


const AterroMemesApp = prop => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default AterroMemesApp;