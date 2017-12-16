// TODO: refactor common properties (isFetching, errorMsg etc.)
// so we can just combine them to create new initial state

export const authenticationState = {
    key: '',
    secret: '',
    isAuthenticating: false,
    errorMsg: '',
    pushNotification: false,
};

export const priceListState = {
    data: {
        btc_idr: {},
        bch_idr: {},
        btg_idr: {},
        eth_idr: {},
        etc_idr: {},
        ltc_idr: {},
        nxt_idr: {},
        waves_idr: {},
        xlm_idr: {},
        xrp_idr: {},
    },
    loading: {
        btc_idr: false,
        bch_idr: false,
        btg_idr: false,
        eth_idr: false,
        etc_idr: false,
        ltc_idr: false,
        nxt_idr: false,
        waves_idr: false,
        xlm_idr: false,
        xrp_idr: false,
    },
    error: {
        btc_idr: '',
        bch_idr: '',
        btg_idr: '',
        eth_idr: '',
        etc_idr: '',
        ltc_idr: '',
        nxt_idr: '',
        waves_idr: '',
        xlm_idr: '',
        xrp_idr: '',
    }
};

export default initialState = {
    priceListState,
}
