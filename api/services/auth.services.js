const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const {SECRET} = process.env;

exports.creatToken = async id => {
  return jwt.sign({ id }, SECRET, { expiresIn: '24h' });
};
