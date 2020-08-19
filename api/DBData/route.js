const express = require("express");
const {
    getTransaction,
    postTransaction
} = require("./DataControler");

const route = express.Router()

route.get('/', getTransaction)
route.post('/', postTransaction)

module.exports = route