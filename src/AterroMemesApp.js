import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import Router from './Router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({ port: 8000 });
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(reduxThunk)
));

function AterroMemesApp(props) {

    const [user, setUser] = useState(null);

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default AterroMemesApp;