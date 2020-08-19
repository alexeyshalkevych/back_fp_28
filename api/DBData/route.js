const express = require("express");
const {
    getTransaction,
    postTransaction
} = require("./DataControler");

const route = express.Router()

route.get('/get', getTransaction)
route.post('/post', postTransaction)

module.exports = route