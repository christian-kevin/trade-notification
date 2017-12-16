// TODO: refactor common properties (isFetching, errorMsg etc.)
// so we can just combine them to create new initial state

export const authenticationState = {
    key: '',
    secret: '',
    isAuthenticating: false,
    errorMsg: '',
    pushNotification: false,
};
