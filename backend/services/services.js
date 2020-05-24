const rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var addCountry = require('../../models/country');
var stats = require('../../models/homePageViews');
var aboutPageViews = require('../../models/aboutPageViews');
var browser = require('../../models/addBrowser');
var users = require('../../models/activeusers');
var addViews = require('../../models/aboutPage');
var session = require('../../models/session');

/**
 * Find country
 * @return {object} object with location info
 */
const getUserCountry = async () => {
    try {
        let url = 'https://ipinfo.io';
        let headers = {
            'Content-Type': 'application/json'
        };
        let options = {
            url: url,
            method: 'GET',
            headers: headers,
            json: true
        };
        let response = await rp(options);
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter views from array
 * @param {array} inputArr input array for filtering
 * @return {array} array of all assets
 */
const filterAllViews = (inputArr) => {
    try {
        let country1 = [];
        let country2 = [];
        let country3 = [];
        let country4 = [];
        inputArr.forEach(country => {
            if (country.country == 'DE') {
                country1.push(country)
            } else if (country.country == 'INDIA') {
                country2.push(country)
            } else if (country.country == 'US') {
                country3.push(country)
            } else if (country.country == 'UK') {
                country4.push(country)
            }
        })
        return [country1.length, country2.length, country3.length, country4.length]
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * views from different location
 * @return {array} array of views for different countries
 */
const getUsersFromCountries = async () => {
    try {
        let finalResult = await addCountry.find({}, "country");
        let finalArr = await filterAllViews(finalResult);
        return finalArr
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter views by country name
 * @param {string} country country name
 * @return {object} object with number of views from given country
 */
const filterViewsByCountry = async (country) => {
    try {
        let view;
        let result = await addCountry.find({}, "country");
        let finalArr = await filterAllViews(result);
        if (country === 'Germany') {
            view = finalArr[0];
        } else if (country === 'India') {
            view = finalArr[1]
        } else if (country === 'US') {
            view = finalArr[2]
        } else if (country === 'UK') {
            view = finalArr[3]
        }
        return { value: view };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter array
 * @param {string} pageId pageId name of page
 * @return {number} number of views
 */
const filterByPageId = async (pageId) => {
    try {
        let views;
        let result;
        if (pageId === 'home') {
            result = await stats.find({ name: "counter" });
        } else if (pageId === 'about') {
            result = await aboutPageViews.find({ name: "counter" }, (err, result) => {
                if (err) {
                }
            })
        }
        views = result[0].count;
        return views
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter views by pageId
 * @param {string} pageId pageId name of page
 * @return {number} number of views
 */
const filterViewsByPageId = async (pageId) => {
    try {
        let finalResult = await filterByPageId(pageId);
        return finalResult
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * add browser type to DB
 * @param {string} browserName name of browser
 * @return {boolean} true if value saved
 */
const addBrowserType = async (browserName) => {
    try {
        let list = new browser();
        list.browser = browserName;
        list.save(function (err, counter) {
        });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter array for getting views
 * @param {array} inputArr input array
 * @return {array} array with number of views based on browser
 */
const filterViewsForBrowser = (inputArr) => {
    try {
        let browser1 = [];
        let browser2 = [];
        let browser3 = [];
        let browser4 = [];
        inputArr.forEach(result => {
            if (result.browser == 'chrome') {
                browser1.push(result)
            } else if (result.browser == 'safari') {
                browser2.push(result)
            } else if (result.browser == 'firefox') {
                browser3.push(result)
            } else if (result.browser == 'edge') {
                browser4.push(result)
            }
        })
        return [browser1.length, browser2.length, browser3.length, browser4.length]
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter views by browser type
 * @return {array} array based on number of views
 */
const filterViewsByBrowser = async () => {
    try {
        let result = await browser.find({}, "browser");
        let finalArr = await filterViewsForBrowser(result);
        return finalArr
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Get active users in time range
 * @return {object} object with number of users
 */
const getActiveUsersinTime = async () => {
    try {
        let finalResult = await users.find({ "created_at": { $gt: new Date(Date.now() - 30 * 60 * 1000) } });
        return {
            views: finalResult.length
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * add and return user country for about us page
 * @return {object} country name 
 */
const addUserCountry = async () => {
    try {
        let views = await getUserCountry();
        let list = new addViews();
        list.country = views.country;
        let value = list.save({});
        return views
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * filter views for aboutUs page
 * @return {array} finalArr with number of views
 */
const filterViewsAboutPage = async () => {
    try {
        let result = await addViews.find({}, "country");
        let finalArr = await filterAllViews(result);
        return finalArr
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Get number of views for userpage
 * @return {object} number of views
 */
const viewValue = async () => {
    try {
        let result = await stats.find({ name: "counter" });
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * add country to DB for home page
 * @return {object} alocation info
 */
const addCountryToDB = async () => {
    try {
        let countryInfo = await getUserCountry();
        let list = new addCountry();
        list.country = countryInfo.country;
        let result = await list.save({});
        return countryInfo;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * save same session value to DB 
 * @param {string} token token
 * @return {boolean} true if session saved
 */
const saveSameSession = async (token) => {
    try {
        let addSessionToken = new session();
        addSessionToken.session = token;
        let value = addSessionToken.save({});
        return true
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * returning user rate
 * @return {object} returning user rate
 */
const userRate = async () => {
    try {
        let result = await session.find({}, 'session');
        const resultNew = result.reduce((a, { session }) => {
            a[session] = a[session] || { session, times: -1 };
            a[session].times += 1;
            return a;
        }, {})
        let sameSession = [];
        let newArr = Object.values(resultNew);
        newArr.forEach(result => {
            if (result.times > 1) {
                sameSession.push(result)
            }
        })
        let userRate = ((sameSession.length) / (newArr.length)) * 100;
        return {
            value: userRate
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    getUserCountry,
    getUsersFromCountries,
    filterViewsByCountry,
    filterViewsByPageId,
    addBrowserType,
    filterViewsByBrowser,
    getActiveUsersinTime,
    addUserCountry,
    filterViewsAboutPage,
    viewValue,
    addCountryToDB,
    saveSameSession,
    userRate
}