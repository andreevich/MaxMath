import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './containers/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import * as reducers from './reducers/';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        MainState: reducers.mainReducers
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);