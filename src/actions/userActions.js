import axios from 'axios';
import { URL_BASE } from '../utils/api';

export const USER_LOGIN = 'USER_LOGIN';
const userLoginSuccess = user => ({
    type: USER_LOGIN,
    user
});

export const USER_STORE_SUCCESS = 'USER_STORE_SUCCESS';
const userStoreSuccess = user => ({
    type: USER_STORE_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
});

export const checkLogin = ({ user_id, api_token }) => dispatch => {
    console.log(user_id, api_token);

    return new Promise((resolve, reject) => {
        axios.post(URL_BASE + '/users/check', { user_id: user_id },
            {
                headers: { Authorization: "Bearer " + api_token }
            })
            .then((data) => {
                console.log(data.data.result);

                const action = userLoginSuccess(data.data.result);
                dispatch(action);
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
    });
}

export const login = ({ email, password }) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(URL_BASE + '/users/login', { email, password })
            .then((data) => {
                const action = userLoginSuccess(data.data.result);
                dispatch(action);

                resolve(data);
            }).catch((err) => {
                reject(err);
            });
    });
}

export const storeUser = ({ name, email, password }) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(URL_BASE + '/users/store', { name, email, password })
            .then((data) => {
                const action = userStoreSuccess(data.data.result);
                dispatch(action);

                resolve(data);
            }).catch((err) => {
                console.log(err);

                reject(err);
            });
    });
}