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
const jwt = require("jsonwebtoken")

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
        logger.error(error);
        throw error;
    }
}

const filterAllViews = (finalResult) => {
    try {
        let country1 = [];
        let country2 = [];
        let country3 = [];
        let country4 = [];
        finalResult.forEach(country => {
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
        logger.error(error);
        throw error;
    }
}

const getUsersFromCountries = async () => {
    try {
        let finalResult = await addCountry.find({}, "country");
        let finalArr = await filterAllViews(finalResult);
        return finalArr
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

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
        logger.error(error);
        throw error;
    }
}

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
        logger.error(error);
        throw error;
    }
}
const filterViewsByPageId = async (pageId) => {
    try {
        let finalResult = await filterByPageId(pageId);
        return finalResult
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const addBrowserType = async (browserName) => {
    try {
        let list = new browser();
        list.browser = browserName;
        list.save(function (err, counter) {
        });
        return true;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
const filterViews = (finalResult) => {
    try {
        let browser1 = [];
        let browser2 = [];
        let browser3 = [];
        let browser4 = [];
        finalResult.forEach(result => {
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
        return [browser1.length, browser2.length, browser2.length, browser3.length]
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
const filterViewsByBrowser = async () => {
    try {
        let result = await browser.find({}, "browser");
        let finalArr = await filterViews(result);
        return finalArr
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const getActiveUsersinTime = async () => {
    try {
        let finalResult = await users.find({ "created_at": { $gt: new Date(Date.now() - 30 * 60 * 1000) } });
        return {
            views: finalResult.length
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const addUserCountry = async () => {
    try {
        let views = await getUserCountry();
        let list = new addViews();
        list.country = views.country;
        let value = list.save({});
        return views
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const filterViewsAboutPage = async () => {
    try {
        let result = await addViews.find({}, "country");
        let finalArr = await filterAllViews(result);
        return finalArr
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const generateToken = async (username) => {
    try {
        const jwtKey = "my_secret_key";
        const jwtExpirySeconds = 300;
        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        let addSessionToken = new session();
        addSessionToken.session = token;
        let value = addSessionToken.save({});
        return { token: token };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const viewValue = async () => {
    try {
        let result = await stats.find({ name: "counter" });
        return result[0];
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const addCountryToDB = async () => {
    try {
        let countryInfo = await getUserCountry();
        let list = new addCountry();
        list.country = countryInfo.country;
        let result = await list.save({});
        return countryInfo;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
const getSession = async () => {
    try {
        let sessions = await session.find({}, 'session')
        return {
            value: sessions.length
        }
    } catch (error) {
        logger.error(error);
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
    generateToken,
    viewValue,
    addCountryToDB,
    getSession
}