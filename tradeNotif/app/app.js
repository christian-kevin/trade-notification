import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import App from './routes';
import { Style } from './core/global';

EStyleSheet.build(Style);

const mainApp = () => (
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
);

export default mainApp;
