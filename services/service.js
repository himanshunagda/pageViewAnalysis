const rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var addCountry = require('../models/country');
var stats = require('../models/stat');
var about = require('../models/about');
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

const getAllViews =  (finalResult) => {
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
module.exports = {
    getCountry,
    getCountries,
    getViews,
    getViewsByPageId
}