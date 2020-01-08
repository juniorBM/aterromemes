export const USER_LOGIN = 'USER_LOGIN';
const userLoginSuccess = user => ({
    type: USER_LOGIN,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});