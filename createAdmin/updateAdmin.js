const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

require('dotenv').config();
mongoose.connect(process.env.DB).then(console.log('db connected'));

const updateAdmin = async ({ username, password }) => {
  const adminDB = await Admin.findOne({ username });
  if (!adminDB) {
    console.log(`Admin not registered with ${username} `);
    return;
  }

  const matched = await bcrypt.compare(password, adminDB.password);
  if (matched) {
    console.log('Cannot insert old password');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newAdmin = await Admin.findOneAndUpdate({
      username: username,
      $set: { password: hashedPassword },
    });
    console.log('admin password was changed');
  } catch (error) {
    console.log(error);
  }
};

updateAdmin({
  username: 'ghimire.amrit147@gmail.com',
  password: '123456',
});
