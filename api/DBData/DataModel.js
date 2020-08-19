const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DataShema = new Schema({
    Transaction: {
        type: Date,
        required: true,
    },
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
    },
    sum: {
        type: Number,
        required: true,
    },
    balans: {
        type: Number,
        required: true,
    },
    owner: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        // required: true,
    },
});

module.exports = mongoose.model('Transaction', DataShema);