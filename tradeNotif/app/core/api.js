/* @flow */

const PRIVATE_URL = 'https://vip.bitcoin.co.id/tapi';
const URL = 'https://vip.bitcoin.co.id/api/';

const urlBuilder = (url: string): string => `${URL}${url}`;
const privateUrlBuilder = (url: string): string => `${PRIVATE_URL}`;

// Emulator cannot use localhost, use your internal IP instead
// Run ip route get 8.8.8.8 | awk '{print $NF; exit}' to get yours
// or from Network preferences if you're using Mac
export default {
    PRICE_LIST: URL,
};
