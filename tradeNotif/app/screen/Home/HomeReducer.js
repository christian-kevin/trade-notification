import {
    GET_PRICE_LIST,
    GET_PRICE_LIST_SUCCESS,
    GET_PRICE_LIST_FAILURE,
} from './HomeAction';
import { priceListState } from '../../core/initialState';
import { parseAPIErrorMessage } from '../../core/util';

export default function reducer(state = priceListState, action) {
    const { payload } = action;
    console.log(action);
    switch (action.type) {
        case GET_PRICE_LIST: {
            return Object.assign({}, state, {
                loading: Object.assign({}, state.loading, {
                    [payload]: true,
                })
            })
        }
        case GET_PRICE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    [payload.url]: payload.data,
                }),
                loading: Object.assign({}, state.loading, {
                    [payload.url]: false,
                })
            })
        }
        case GET_PRICE_LIST_FAILURE: {
            return Object.assign({}, state, {
                error: Object.assign({}, state.error, {
                    [payload.url]: parseAPIErrorMessage(payload.error),
                }),
                loading: Object.assign({}, state.loading, {
                    [payload.url]: false,
                })
            })
        }
        default:
            return state;
    }
}
