import moment from "moment-timezone";
import twitUser from "../utilities/twitUser";
import Term from "../common/Term";
import logFailure from "../utilities/log";

const tweetPostStatUpdate = (message: string, type: Term) => {
    twitUser.post("statuses/update", { status: message }, (error, data, response) => {
        const currentTime = moment().utc().format();
        if (!!error) {
            logFailure(`${currentTime} ${type} Rank Tweet Failed.`, error.name, error.message);
            setTimeout(() => { tweetPostStatUpdateRetry(message, type) }, 30 * 1000);
        }
        else if (response.statusCode === 200) {
            console.log(`${currentTime} ${type} Rank Tweet Successful`);
        } else {
            logFailure(`${currentTime} ${type} Rank Tweet Failed. ${response.statusCode}`);
            setTimeout(() => { tweetPostStatUpdateRetry(message, type) }, 30 * 1000);
        }
    });
}

const tweetPostStatUpdateRetry = (message: string, type: Term) => {
    twitUser.post("statuses/update", { status: message }, (error, data, response) => {
        const currentTime = moment().utc().format();
        if (!!error) {
            logFailure(`${currentTime} ${type} Rank Retry Tweet Failed.`, error.name, error.message);
        }
        else if (response.statusCode === 200) {
            console.log(`${currentTime} ${type} Rank Retry Tweet Successful`);
        } else {
            logFailure(`${currentTime} ${type} Rank Retry Tweet Failed. ${response.statusCode}`);
        }
    });
};

export default tweetPostStatUpdate;
