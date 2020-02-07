import axios from 'axios';
import { URL_BASE } from '../utils/api';

export const feedStore = ({ feed, api_token }) => {
    return new Promise((resolve, reject) => {
        axios.post(URL_BASE + '/feeds/store', feed,
            {
                headers: { Authorization: "Bearer " + api_token }
            }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
    })

}