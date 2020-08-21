const transactionModel = require("./DataModel");
const userModel = require("./userMod");
const {
    use
} = require("./route");

async function getTransaction(req, res, next) {
    try {
        const {
            id
        } = req.body;
        const user = await transactionModel
            .find({
                userOwner: id,
            })
            .exec();
        // const lastUser = user[user.length - 1]
        // console.log(user[user.length - 1]);
        // const b = totalBalance(lastUser);
        // console.log(b);
        res.status(200).send(user);
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

        } = req.body;

        const user = await transactionModel
            .find({
                userOwner: id,
            })
            .exec();
        const lastUser = user[user.length - 1]
        const balance = balanceLastTransaction(lastUser, type, sum);

        const transaction = {
            date,
            type,
            category,
            sum,
            comment,
            balance: balance,
            userOwner: id,
        };

        const newTransaction = await transactionModel.create(transaction);

        const updatedUser = await userModel.findByIdAndUpdate(
            id, {
                $push: {
                    transaction: newTransaction._id,
                },
            }, {
                new: true,
            }
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
            userId,

        } = req.body;
        // transactionModel.ensureIndexes({
        //     _id: -1
        // })
        // const prev = await transactionModel.find({
        //     _id: {$lt}
        // })
        // console.log(prev);
        const removedTransaction = await transactionModel.findByIdAndDelete(
            transactionId
        );
        if (!removedTransaction) {
            return res.status(404).send();
        }
        const updatedUser = await userModel
            .findByIdAndUpdate(
                userId, {
                    $pull: {
                        transaction: transactionId,
                    },
                }, {
                    new: true,
                }
            )
            .populate("transactionModel");
        UpdateBalance(transactionId)
        return res.status(204).send(updatedUser);
    } catch (error) {
        next(error);
    }
}

async function updateTransaction(req, res, next) {
    try {
        const {
            transactionId
        } = req.params;
        const {
            date,
            type,
            category,
            sum,
            comment,
            balance
        } = req.body;
        const newTransaction = {
            date,
            type,
            category,
            sum,
            comment,
            balance,
        };
        const transactionUpdate = transactionModel.findByIdAndUpdate({
                _id: transactionId,
            },
            newTransaction
        );

        res.status(200).send(transactionUpdate);
    } catch (error) {
        console.log("Error", error);
    }
}

// function resultBalance(req) {
//     const {
//         type,
//         balance,
//         sum
//     } = req.body;
//     const total = 0;
//     switch (type) {
//         case "+":
//             const result = balance + sum;

//             return result;

//         case "-":
//             const resu = balance - sum;

//             return resu;

//         default:
//             return console.log("not type");
//     }
// }

function balanceLastTransaction(lastTransaction, type, sum) {
    console.log(lastTransaction);
    switch (type) {
        case "+":
            if (lastTransaction == undefined) {
                return +sum
            }
            console.log(lastTransaction.balance);

            return (lastTransaction.balance += sum);
        case "-":
            if (lastTransaction.balance === undefined) {
                return -sum
            }
            return (lastTransaction.balance -= sum);
        default:
            return console.log("not type");
    }
}

async function UpdateBalance(id) {
    let total = 0;
    console.log(total);
    try {
        // const {
        //     id
        // } = req.body;
        const user = await transactionModel
            .find({
                userOwner: id,
            })
            .exec();
        console.log(user);
        user.map((el) => {
            switch (el.type) {
                case "+":
                    return (el.balance += el.sum);
                case "-":
                    return (el.balance -= el.sum);
                default:
                    return console.log("not type");
            }

        });

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getTransaction,
    postTransaction,
    deleteTransaction,
    updateTransaction,

};