import { Dimensions } from 'react-native';
/**
 * Disclaimer:
 * PLEASE DON'T IMPORT ANY FILES, BECAUSE THIS FILE NEED TO LOAD FIRST
 */

const { height, width } = Dimensions.get('window');

// region SCREEN CONSTANT
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH_NORMAL_LIMIT = 340;
// endregion

// region TYPOGRAPHY CONSTANT
export const NORMAL_FONT_SIZE = 14;
export const BIG_FONT_SIZE = 16;
export const REM_UNIT = SCREEN_WIDTH > SCREEN_WIDTH_NORMAL_LIMIT ? BIG_FONT_SIZE : NORMAL_FONT_SIZE;
// endregion

export const priceArray = [
    {
        id: 0,
        url: 'btc_idr',
        unit: 'btc',
    },
    {
        id: 1,
        url: 'bch_idr',
        unit: 'bch',
    },
    {
        id: 2,
        url: 'btg_idr',
        unit: 'btg',
    },
    {
        id: 3,
        url: 'eth_idr',
        unit: 'eth',
    },
    {
        id: 4,
        url: 'etc_idr',
        unit: 'etc',
    },
    {
        id: 5,
        url: 'ltc_idr',
        unit: 'ltc',
    },
    {
        id: 6,
        url: 'nxt_idr',
        unit: 'nxt',
    },
    {
        id: 7,
        url: 'waves_idr',
        unit: 'waves',
    },
    {
        id: 8,
        url: 'xlm_idr',
        unit: 'xlm',
    },
    {
        id: 9,
        url: 'xrp_idr',
        unit: 'xrp',
    },

]
