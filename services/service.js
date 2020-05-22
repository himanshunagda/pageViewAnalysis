const rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var addCountry = require('../models/country');
var stats = require('../models/stat');
var about = require('../models/about');
var browser = require('../models/browser');
var users = require('../models/activeusers');
const getCountry = async (req, res) => {
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
}

const getAllViews = (finalResult) => {
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
}
const getCountries = async () => {
    let finalResult = await addCountry.find({}, "country");
    let finalArr = await getAllViews(finalResult);
    console.log(finalArr);
    return finalArr
}

const getViews = async (country) => {
    let view;
    let finalResult = await addCountry.find({}, "country");
    let finalArr = await getAllViews(finalResult);
    console.log(finalArr);
    if (country === 'Germany') {
        view = finalArr[0];
    } else if (country === 'India') {
        view = finalArr[1]
    } else if (country === 'US') {
        view = finalArr[2]
    } else if (country === 'UK') {
        view = finalArr[3]
    }
    console.log(view);
    return { value: view };
}

const getViewsByPageId = async (pageId) => {
    let views;
    if (pageId === 'home') {
        await stats.find({ name: "counter" }, (err, result) => {
            if (err) {
            }
            views = result[0].count;
        })
    } else if (pageId === 'about') {
        await about.find({ name: "counter" }, (err, result) => {
            if (err) {
            }
            views = result[0].count;
        })
    }
    return views
}

const addBrowser = async (browserName) => {
    let list = new browser();
    list.browser = browserName;
    list.save(function (err, counter) {
    });
    return true;
}
const getBrowserViews = (finalResult) => {
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
}
const getBrowserValue = async () => {
    let finalResult = await browser.find({}, "browser");
    console.log(finalResult);
    let finalArr = await getBrowserViews(finalResult);
    console.log(finalArr);
    return finalArr
}

const getActiveUsers = async () => {
    let finalResult = await users.find({"created_at":{$gt:new Date(Date.now() - 30*60*1000)}});
    return {
        views: finalResult.length};
}
module.exports = {
    getCountry,
    getCountries,
    getViews,
    getViewsByPageId,
    addBrowser,
    getBrowserValue,
    getActiveUsers
}