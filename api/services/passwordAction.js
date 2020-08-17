const bcrypt = require('bcrypt');
const { sault } = require('../config');

exports.generetPassword = async password => {
    await bcrypt.hash(password, sault);
return
};
