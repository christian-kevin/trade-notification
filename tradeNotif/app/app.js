import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import App from './routes';
import { Style } from './core/global';
import configureStore from './core/store';
import initialState from './core/initialState';

EStyleSheet.build(Style);
const store = configureStore(initialState);

const NotifApp = () => (
    <Provider store={store}>
        <App
            onNavigationStateChange={(prevState, newState, action) => {
                // Might need to make this more selective and efficient in the future

                if (process.env.NODE_ENV === 'development') {
                    /* eslint-disable no-console */
                    if (console.group) {
                        console.group('Navigation Dispatch: ');
                        console.log('Prev State: ', prevState);
                        console.log('Action: ', action);
                        console.log('New State: ', newState);
                        console.groupEnd();
                    } else {
                        console.log('Navigation Dispatch: ', {
                            prevState,
                            action,
                            newState,
                        });
                    }
                    /* eslint-enable no-console */
                }
            }}
        />
        </Provider>
);

export default NotifApp;
export { store };
