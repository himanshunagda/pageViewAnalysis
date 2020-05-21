const rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Stat');
var addCountry = require('../models/country');

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

const getCountries = async (req, res) => {
    let countries;
    let country1 = [];
    let country2 = [];
    let country3 = [];
    let country4 = [];
    await addCountry.find({}, "country", (err, country) => {
        if (err) {
        }
        countries = country;
        countries.forEach(country => {
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
    })
    let obj = {
        Germany: country1.length,
        India: country2.length,
        US: country3.length,
        UK: country4.length
    }
    let finalArr = [country1.length, country2.length, country3.length, country4.length]
    return obj;
}

module.exports = {
    getCountry,
    getCountries
}