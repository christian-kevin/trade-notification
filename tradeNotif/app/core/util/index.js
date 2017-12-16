/* @flow */
import { Share, Alert } from 'react-native';
import resolveAssetSource from 'resolveAssetSource';
import Analytics from 'react-native-firebase-analytics';
import moment from 'moment';
import { memoize, reduce, forEach, range, snakeCase } from 'lodash';
import { SCREEN_WIDTH, REM_UNIT, NORMAL_FONT_SIZE } from '../constant';
import { store } from '../../index';
import { revoke } from '../../screen/Account/AuthenticationAction';
import { cancelInvoice } from '../../screen/Payment/PaymentAction';

export const isNumeric = (n: string): boolean => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * Giving proper dots for monetary values, e.g. (Rp) 560.000.
 * @param {number} value
 * @returns {string} Value with dots
 */
export const numberWithDot = (value: number): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/**
 * Get local image height if we want to scale it to full width.
 * @param {number} image Image that had been require()'ed
 * @returns {number} Calculated image height
 */
export const getImageHeight = (image: number): number => {
  const ratio = SCREEN_WIDTH / resolveAssetSource(image).width;
  return resolveAssetSource(image).height * ratio;
};

/**
 * This function is used to save style in cache (cache in javascript memory). For instance, when
 * two object that use the same component were initiated, they would use one stylesheet object
 * which was firstly initiated. Key that had been used for cache is generated from arguments
 * concatenation.
 * @param {function} essFunc function that return object
 * @param {function} resolverFunc custom resolver function that define key for cache map in memoize
 * @returns {Object} The (memoized) style object
 */
export function memoizeMultiArgs(
  essFunc: () => mixed,
  resolverFunc?: () => mixed = (...args) => args.toString(),
): { [string]: string } {
  return memoize(essFunc, resolverFunc);
}

/**
 * This is used to convert dp value into rem value based on default REM_UNIT that has been used by
 * Extended Stylesheet.
 * @param number the dp value
 * @param noSuffix remove 'rem' suffix
 * @param getNumberInstead cast converted dp value to number. (noSuffix must be true)
 * @returns {string | number} dp value in rem
 */
export function dpToRem(
  number: number,
  noSuffix: boolean,
  getNumberInstead: boolean,
): string | number {
  if (!noSuffix && getNumberInstead) {
    throw new Error('getNumberInstead can be used when noSuffix is true.');
  }
  const converted = number / REM_UNIT;
  if (noSuffix) {
    return getNumberInstead ? converted : `${converted}`;
  }
  return `${converted}rem`;
}

/**
 * This function is used for re-scale given number based on font size that current device used. The
 * number will be divided by NORMAL_FONT_SIZE then multiplied by current font size.
 *
 * @param number the dp value
 * @returns {number} adjusted dp value based on font size.
 */
function dynamicDp(number: number): number {
  const ratio = NORMAL_FONT_SIZE / REM_UNIT;
  return number * ratio;
}

/**
 * Creating GET query params string (e.g. to call search/browse API).
 * @param {object} obj key-value object for the params
 * @returns {string} The concatenated query params
 */
export const serialize = (obj): string => {
  if (Object.keys(obj).length === 0) {
    return '';
  }

  const url = reduce(
    obj,
    (result, value, key) => {
      if (Array.isArray(value)) {
        return (
          result +
          reduce(
            value,
            (temp, item) => `${temp}${encodeURIComponent(key)}=${encodeURIComponent(item)}&`,
            '',
          )
        );
      }
      return `${result}${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    },
    '?',
  );

  return url;
};

/**
 * Creating request object for search API,
 * filling them with default values if certain keys are not specified.
 * @param {object} request values that will be overriden
 * @param {number} page page number, used especially for infinite scroll
 * @returns The same searchRequest object but with the default values filled
 */
export const fillParamsForSearchAPI = (request, page: number) => {
  const search = Object.assign({}, request);

  search.men = search.men || false;
  search.women = search.women || false;
  search.child = search.child || false;
  search.nonEtnik = search.nonEtnik || false;
  search.etnik = search.etnik || false;
  search.priceMin = search.priceMin || 0;
  search.priceMax = search.priceMax || 99999999;
  search.sortMode = search.sortMode || 1;
  search.readyStock = search.readyStock || false;
  search.preorder = search.preorder || false;
  search.custom = search.custom || false;
  search.page = page || 1;

  return search;
};

export const parseDeepLinkingRequestParams = (request) => {
  if (request.sortMode) request.sortMode = parseInt(request.sortMode, 10);
  if (request.priceMin) request.priceMin = parseInt(request.priceMin, 10);
  if (request.priceMax) request.priceMax = parseInt(request.priceMax, 10);
  if (request.men) request.men = request.men === 'true';
  if (request.women) request.women = request.women === 'true';
  if (request.child) request.child = request.child === 'true';
  if (request.etnik) request.etnik = request.etnik === 'true';
  if (request.nonEtnik) request.nonEtnik = request.nonEtnik === 'true';
  if (request.readyStock) request.readyStock = request.readyStock === 'true';
  if (request.preorder) request.preorder = request.preorder === 'true';
  if (request.custom) request.custom = request.custom === 'true';

  return request;
};

const apiUtils = {
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    if (response.status === 401) {
      store.dispatch(revoke());
    }

    return new Promise((resolve) => {
      resolve(response.json());
    }).then((errorMsg) => {
      const errors = errorMsg.errors ? errorMsg.errors : errorMsg.message;
      return Promise.reject(errors);
    });
  },
};

export const isAuthenticated: boolean = (authenticationState) => {
  const { accessToken, expiredAt } = authenticationState;

  if (accessToken.length === 0) {
    return false;
  }

  if (expiredAt < new Date()) {
    // todo: test if this works
    store.dispatch(revoke());
    return false;
  }

  return true;
};

const fetchHelper = (
  method: string,
  endpoint: string,
  authenticated: boolean = false,
  payload = {},
) => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(
      reject,
      25000,
      'Terjadi kendala dalam menghubungi server, mohon periksa koneksi Anda',
    );
  });
  const options = {
    method,
  };
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  if (authenticated) {
    // todo
    // if (!isAuthenticated()) {
    //   return Promise.reject();
    // }
    headers.append('Authorization', `Bearer ${store.getState().authentication.accessToken}`);
  }

  if (method === 'POST') {
    options.body = JSON.stringify(payload);
  }

  options.headers = headers;
  const request = fetch(endpoint, options).catch(() =>
    Promise.reject('Tidak ada koneksi internet.'),
  );

  return Promise.race([timeout, request])
    .then(apiUtils.checkStatus)
    .then(response => response.json());
};

export const fetchGet = (endpoint: string, authenticated: boolean = false) =>
  fetchHelper('GET', endpoint, authenticated);

export const fetchPost = (endpoint: string, payload = {}, authenticated: boolean = false) =>
  fetchHelper('POST', endpoint, authenticated, payload);

export const uploadImage = (url: string, opts = {}) => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(
      reject,
      25000,
      'Terjadi kendala dalam menghubungi server, mohon periksa koneksi Anda',
    );
  });
  const upload = new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (const k in opts.headers || {}) {
      xhr.setRequestHeader(k, opts.headers[k]);
    }
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    xhr.send(opts.body);
  });
  return Promise.race([timeout, upload]);
};

/**
 * Normalize query that will be sent for search.
 * @param {string} query
 * @returns {string} The normalized query
 */
export const normalizeQuery = (query: string): string =>
  query
    .trim()
    .replace(' ', '-')
    .toLowerCase();

/**
 * Convert string to title case (e.g. Tas Kulit Pria)
 * @param {string} str
 * @returns {string} The string in title case
 */
export const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

/**
 * Check whether the given string is empty or consists of only whitespaces
 * @param {string} str
 * @returns {boolean} String is empty or only whitespaces
 */
export const isEmptyOrSpaces = (str: string): boolean =>
  str === null || str.match(/^\s*$/) !== null;

/**
 * Check whether the given string qualifies to be an email address
 * @param {string} email
 * @returns {boolean} String has valid email address format
 */
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Check whether the given string qualifies to be a phone number. The same one as in our web
 * @param {string} str
 * @returns {boolean} String has valid phone number format
 */
export const validatePhoneNumber: boolean = (phoneNumber: string) => {
  const re = new RegExp('^(\\+?62|0)8\\d+$');
  return re.test(phoneNumber);
};

export const isItemLiked = (itemId: number, favorites): boolean =>
  favorites.items.find(item => item.itemId === itemId) !== undefined ||
  favorites.temporaryItemIds.includes(itemId);

export const generateSelectionList = (start: number, end: number) => {
  const arrayNumber = range(start, end + 1);
  const result = [];
  forEach(arrayNumber, (value) => {
    result.push({ id: value, title: value.toString() });
  });
  return result;
};

export const handlePaymentCancellation = () => {
  Alert.alert(
    'Apakah kamu yakin untuk membatalkan transaksi ini?',
    'Jika kamu membatalkan transaksi ini, kamu harus mengulang proses dari awal.',
    [
      { text: 'Tidak' },
      {
        text: 'Ya',
        onPress: () => store.dispatch(cancelInvoice()),
      },
    ],
  );
};

export const getCardType = (number) => {
  if (number.match(new RegExp('^4')) !== null) return 'visa';
  if (number.match(new RegExp('^5[1-5]')) !== null) return 'mastercard';
  return '';
};

export const luhnCheck = (ccNum: string): boolean => {
  const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let len = ccNum.length;
  let bit = 1;
  let sum = 0;
  let val;

  while (len) {
    val = parseInt(ccNum.charAt(--len), 10);
    sum += (bit ^= 1) ? arr[val] : val;
  }

  return sum && sum % 10 === 0;
};

export const creditCardExpiryCheck = (month: string, year: string): boolean => {
  const creditCardDate = moment(`${month}-${year}`, 'MM-YYYY');
  const today = moment();

  return creditCardDate.isValid() && today < creditCardDate.add(1, 'months');
};

/**
   * Guarantees that error message in reducer will always be a string
   * @param {any} error
   * @returns {string} Error message that is ready to be displayed
   */
export const parseAPIErrorMessage = (error): string => {
  const GENERIC_ERROR_MESSAGE = 'Terjadi kesalahan. Mohon ulangi lagi';

  if (error === undefined) {
    // logError('Error message from API is undefined');
    return GENERIC_ERROR_MESSAGE;
  }

  const errorToAnalyze = error.message ? error.message : error;

  if (typeof errorToAnalyze === 'string') {
    return errorToAnalyze;
  }

  if (Array.isArray(errorToAnalyze)) {
    if (errorToAnalyze.length === 0) {
      // logError('Error message from API is empty array');
      return GENERIC_ERROR_MESSAGE;
    } else if (errorToAnalyze.length === 1) {
      return errorToAnalyze[0];
    }
    return errorToAnalyze.join('. ');
  }

  // logError('Error message from API is unknown');
  return GENERIC_ERROR_MESSAGE;
};

export const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

export const generateItemCategoryForAnalytics = categories =>
  categories.reduce((sum, value) => `${sum} > ${value.name}`, '').substring(3);

export const convertObjectKeysToSnakeCase = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[snakeCase(key)] = obj[key];
  });
  return newObj;
};

/**
 * A temporary fix for editor's pick description that uses rich HTML content
 */
export const stripHtmlTags = text => text.replace('</p>', '\n').replace('<br>', '\n').replace(/<(?:.|\n)*?>/gm, '');
