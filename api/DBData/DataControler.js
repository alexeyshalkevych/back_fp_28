const transactionModel = require('./DataModel');
const userModel = require('./userMod');

async function getTransaction(req, res, next) {
    try {
        const {
            id
        } = req.body
        const user = await transactionModel.find({
            userOwner: id
        }).exec()
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
}


async function postTransaction(req, res, next) {
    try {
        const {
            date,
            id,
            type,
            category,
            sum,
            comment,
            balance
        } = req.body;

        const transaction = {
            date,
            type,
            category,
            sum,
            comment,
            balance,
            userOwner: id,

        };

        const newTransaction = await transactionModel.create(transaction);
        const updatedUser = await userModel.findByIdAndUpdate(
            id, {
                $push: {
                    transaction: newTransaction._id
                },
            }, {
                new: true
            },
        );

        res.status(201).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function deleteTransaction(req, res, next) {
    try {
        const {
            transactionId,
            userId
        } = req.body;

        const removedTransaction = await transactionModel.findByIdAndDelete(transactionId);
        if (!removedTransaction) {
            return res.status(404).send();
        }
        const updatedUser = await userModel
            .findByIdAndUpdate(
                userId, {
                    $pull: {
                        transaction: transactionId
                    },
                }, {
                    new: true
                },
            )
            .populate('transaction');
        return res.status(204).send(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function updateTransaction(req, res, next) {}

async function totalBalance(req, res, next) {}

module.exports = {
    getTransaction,
    postTransaction,
    deleteTransaction,
    updateTransaction,
};