const path = require('path');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { SECRET } = process.env;

exports.creatToken = async id => {
  return jwt.sign({ id }, SECRET, { expiresIn: '24h' });
};

exports.getUserInfoFromGoogle = async token => {
  const { data } = await axios.get(
    'https://openidconnect.googleapis.com/v1/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};
