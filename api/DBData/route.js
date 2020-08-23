const express = require("express");
const {
    getTransaction,
    postTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionForStatistic
} = require("./DataControler");
const { tokenMiddleware } = require("../middleware/auth.middleware");

const route = express.Router()

route.get('/get', getTransaction);
route.get('/get/stat', tokenMiddleware, getTransactionForStatistic)
route.post('/post', postTransaction);
route.delete('/delete', deleteTransaction);
route.patch('/update', updateTransaction);

module.exports.transactionRouter = route