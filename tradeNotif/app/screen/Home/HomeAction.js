import { API } from '../../core/global';
import { fetchGet } from '../../core/util';
import { forEach } from 'lodash';
import { priceArray } from '../../core/constant';
import { store } from '../../index';

export const GET_PRICE_LIST = 'GET_PRICE_LIST';
export const GET_PRICE_LIST_SUCCESS = 'GET_PRICE_LIST_SUCCESS';
export const GET_PRICE_LIST_FAILURE = 'GET_PRICE_LIST_FAILURE'

export function getPriceList(payload) {
    return {
        type: GET_PRICE_LIST,
        payload
    }
}

export function getPriceListSuccess(url, data) {
    return {
        type: GET_PRICE_LIST_SUCCESS,
        payload: { url, data },
    }
}

export function getPriceListFailure(url, error) {
    return {
        type: GET_PRICE_LIST_FAILURE,
        payload: { url, error },
    }
}

export function populateList() {
        setInterval(() => forEach(priceArray, unit => {
            if (!store.getState().priceList.loading[unit.url]) {
                getPrice(unit.url);
            }
        }), 3000);
}

export function getPrice(url) {
    return (dispatch) => {
        dispatch(getPriceList(url));
        console.log(`${API.PRICE_LIST}${url}/ticker`);
        return fetchGet(`${API.PRICE_LIST}${url}/ticker`)
            .then((responseJson) => {
                dispatch(getPriceListSuccess(url, responseJson))
            })
            .catch((err) => {
                dispatch(getPriceListFailure(url, err))
            });
    }
}
