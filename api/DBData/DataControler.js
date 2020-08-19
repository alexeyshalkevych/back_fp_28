const DataModel = require('./DataModel');
// const userModel = require('')

async function getTransaction(req, res, next) {
    try {
        const {userId} = req.body
        const user = await DataModel.findById(
userId).populate('transaction')
    } catch (error) {
        console.log(error);
        
    }
}


async function postTransaction(req, res, next) {
  try {
    const { id, type, category, sum, comment } = req.body;
    const transaction = {
      date,
      type,
      category,
      sum,
      comment,
      balance,
      owner: id,
    };
    const newTransaction = await DataModel.create(transaction);
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $push: { transaction: newTransaction._id },
      },
      { new: true },
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

async function deleteTransaction(req, res, next) {
  try {
    const { transactionId, userId } = req.body;

    const removedTransaction = await DataModel.findByIdAndDelete(transactionId);
    if (!removedTransaction) {
      return res.status(404).send();
    }
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          $pull: { transaction: transactionId },
        },
        { new: true },
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
