import axios from 'axios';
import { URL_BASE } from '../utils/api';

export const FEED_LIST = 'FEED_LIST';
const feedList = feeds => ({
    type: FEED_LIST,
    feeds
});


export const allFeeds = ({ nextPage, api_token }) => dispatch => {
    // console.log(nextPage);

    return new Promise((resolve, reject) => {
        console.log(nextPage);

        if (nextPage != 'finish') {
            axios.get(nextPage ? nextPage : URL_BASE + '/feeds/all',
                {
                    headers: { Authorization: "Bearer " + api_token }
                })
                .then((data) => {
                    const action = feedList(data.data.result.data);
                    dispatch(action);
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
        }

    });
}


export const likeFeed = ({ feedId, api_token }) => dispatch => {

    return new Promise((resolve, reject) => {

        axios.post(URL_BASE + '/likes/feed', { feedId },
            {
                headers: { Authorization: "Bearer " + api_token }
            })
            .then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
    })
}