const transactionModel = require('./DataModel');
const userModel = require('../user/user.model');

async function getTransaction(req, res, next) {
<<<<<<< HEAD
    try {
        const {
            userId
        } = req.body;
        const user = await transactionModel
            .find({
                userOwner: userId,
            })
            .exec();
        res.status(200).send(user, filterBalance(user));
    } catch (error) {
        console.log(error);
    }
=======
  try {
    const { _id } = req.user;

    const user = await transactionModel
      .find({
        userOwner: _id,
      })
      .exec();

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
>>>>>>> 0aa5c72c3d91898f1e25389e81225eb27dfea47b
}

async function postTransaction(req, res, next) {
  try {
    const { date, type, category, sum, comment } = req.body;
    const { _id } = req.user;

    const user = await transactionModel
      .find({
        userOwner: _id,
      })
      .exec();
    const lastUser = user[user.length - 1];
    const balance = balanceLastTransaction(lastUser, type, sum);

    const transaction = {
      date,
      type,
      category,
      sum,
      comment,
      balance: balance,
      userOwner: _id,
    };

    const newTransaction = await transactionModel.create(transaction);

    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        $push: {
          transaction: {
            _id: newTransaction._id,
          },
        },
      },
      {
        new: true,
      },
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req, res, next) {
<<<<<<< HEAD
    try {
        const {
            transactionId,
            userId,
        } = req.body;

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
            .populate("transactionData");
        UpdateBalance(userId)
        return res.status(204).send(updatedUser);
    } catch (error) {
        next(error);
=======
  try {
    const { transactionId } = req.body;
    const { _id } = req.user;

    const removedTransaction = await transactionModel.findByIdAndDelete(
      transactionId,
    );

    if (!removedTransaction) {
      return res.status(404).send();
>>>>>>> 0aa5c72c3d91898f1e25389e81225eb27dfea47b
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        $pull: {
          transaction: {
            _id: transactionId,
          },
        },
      },
      {
        new: true,
      },
    );
    UpdateBalance(_id);
    return res.status(204).send(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(req, res, next) {
  try {
    const { transactionId, userId } = req.body;

    const { date, type, category, sum, comment } = req.body;
    const newTransaction = {
      date,
      type,
      category,
      sum,
      comment,
    };
    const transactionUpdate = await transactionModel.findByIdAndUpdate(
      {
        _id: transactionId,
      },
      newTransaction,
    );
    await UpdateBalance(userId);

    res.status(200).send('transaction updated');
  } catch (error) {
    console.log('Error', error);
  }
}

function balanceLastTransaction(lastTransaction, type, sum) {
  switch (type) {
    case '+':
      if (lastTransaction == undefined) {
        return +sum;
      }
      return (lastTransaction.balance += sum);
    case '-':
      if (lastTransaction.balance === undefined) {
        return -sum;
      }
      return (lastTransaction.balance -= sum);
    default:
      return console.log('not type');
  }
}

async function UpdateBalance(userId) {
  try {
    const user = await transactionModel
      .find({
        userOwner: userId,
      })
      .exec();

    user.map(async el => {
      const prev = user.indexOf(el);

      if (prev === 0) {
        switch (el.type) {
          case '+':
            el.balance = 0 + el.sum;

            const updateEl = await transactionModel.findByIdAndUpdate(el._id, {
              balance: el.balance,
            });

            return;
          case '-':
            el.balance = 0 - el.sum;
            const updateE = await transactionModel.findByIdAndUpdate(el._id, {
              balance: el.balance,
            });
            return;
          default:
            return console.log('not type');
        }
      } else {
        switch (el.type) {
          case '+':
            user[prev].balance = user[prev - 1].balance += el.sum;
            const updateEl1 = await transactionModel.findByIdAndUpdate(el._id, {
              balance: el.balance,
            });
            return;
          case '-':
            user[prev].balance = user[prev - 1].balance -= el.sum;
            const updateEl2 = await transactionModel.findByIdAndUpdate(el._id, {
              balance: el.balance,
            });
            return;
          default:
            return console.log('not type');
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function filterBalance(globalType, arr){
    function unique(arr) {
        let result = [];
        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            };
        };
        return result;
    };
    function getBalance (type, value) {
        const ArrCategory = arr.filter(el => el[type] === value);
        return ArrCategory.reduce((acc, val) => {
        if(type === "category") {
            if(type === globalType) {
                return acc + val['sum']
            } else if("all" === globalType){
                return acc + val['sum']
            };
        };
        return acc + val['sum']
        }, 0)
    };
    const category = arr.reduce((acc, val) => {
        if(val.type === globalType) {
            acc.push(val.category)
        } else if("all" === globalType){
            acc.push(val.category)
        };
        return unique(acc)
    },[]);
    const arrayCategory = category.reduce((acc, el) => {
        acc.push({
        "category": el,
        "sum": getBalance("category", el),
        });
        return acc
    },[]);
    const profit = getBalance("type", "+");
    const exes = getBalance("type", "-");
    const finalObject = {
        "arr": arrayCategory,
        "income": profit,
        "expenses": exes,
    };
    return finalObject
}

module.exports = {
<<<<<<< HEAD
    getTransaction,
    postTransaction,
    deleteTransaction,
    updateTransaction,
};
=======
  getTransaction,
  postTransaction,
  deleteTransaction,
  updateTransaction,
};
>>>>>>> 0aa5c72c3d91898f1e25389e81225eb27dfea47b
