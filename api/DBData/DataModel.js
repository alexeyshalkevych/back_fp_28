const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DataShema = new Schema({
    // Transaction: {
    //     type: String,
    //     required: true,
    // },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,

    },
    sum: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },

});

const transactionModel = mongoose.model('transactionData', DataShema);

module.exports = transactionModel