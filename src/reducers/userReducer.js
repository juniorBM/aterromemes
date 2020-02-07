import { AsyncStorage } from 'react-native';
import { USER_LOGIN, USER_LOGOUT, USER_STORE_SUCCESS } from '../actions';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case USER_LOGIN:
            new Promise((resolve, reject) => {
                AsyncStorage.setItem('user',
                    JSON.stringify(
                        {
                            'id': action.user.id,
                            'api_token': action.user.api_token,
                            'expires_token': action.user.expires_token
                        }
                    )
                )
                    .then(() => resolve())
                    .catch(err => reject(err));
            })
            return action.user;
        case USER_STORE_SUCCESS:

            new Promise((resolve, reject) => {
                AsyncStorage.setItem('user',
                    JSON.stringify(action.user)
                )
                    .then(() => resolve())
                    .catch(err => reject(err));
            })
            return action.user;
        case USER_LOGOUT:
            return null;
        default:
            return state;
    }
}