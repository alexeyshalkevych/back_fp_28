const express = require("express");
const {
    getTransaction,
    postTransaction,
    deleteTransaction,
    totalBalance,
    updateTransaction
} = require("./DataControler");

const route = express.Router()

route.get('/get', getTransaction)
route.post('/post', postTransaction)
route.delete('/delete', deleteTransaction)
route.patch('/update', updateTransaction)

module.exports = route