import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './core/store';
import initialState from './core/initialState';
import NotifApp from './app';

const store = configureStore(initialState);

class MyApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <NotifApp />
            </Provider>
        );
    }
}

export { store };
export default MyApp;
