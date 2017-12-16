import { API } from '../../core/global';
import { fetchGet } from '../../core/util';

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

export function getPrice(url) {
    return (dispatch) => {
        dispatch(getPriceList(url));
        return fetchGet(`${API.PRICE_LIST}${url}/ticker`)
            .then((responseJson) => {
                if (responseJson.error) {
                    throw responseJson.error;
                } else {
                    dispatch(getPriceListSuccess(url, responseJson));
                }
            })
            .catch((err) => {
                dispatch(getPriceListFailure(url, err))
            });
    }
}
