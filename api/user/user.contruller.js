const userModel = require('./user.model');

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userModel.find(req.quey, {
        name: false,
        password: false,
        _id: false,
      });
      if (!users) {
        return res.status(400).send({ message: 'User not founded' });
      }
      return res.status(201).send(users);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }


}

module.exports = new UserController();
