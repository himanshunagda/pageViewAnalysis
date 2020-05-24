'use strict';
const jwt = require("jsonwebtoken")
var session = require('../../models/session');

const verifyToken = () => {
    return async (req, res, next) => {
        let jwtToken = req.body.token;
        let readFromDB = await session.find({}, "session");
        let result = readFromDB.includes(readFromDB.find(value => value.session === jwtToken));
        if (result === false) {
            res.status(400).send('Server requires application/json')
        } else {
            next()
        }
    }
}
/**
 * Generate and add JWT token
 * @param {string} username username
 * @return {object} token
 */
const generateToken = async (username) => {
    try {
        const jwtKey = "TestSecretKey";
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
        console.log(error);
        throw error;
    }
}


module.exports = {
    verifyToken,
    generateToken
}