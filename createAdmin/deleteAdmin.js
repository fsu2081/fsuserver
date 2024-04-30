const mongoose = require('mongoose');
const Admin = require('../model/Admin');

require('dotenv').config();
mongoose.connect(process.env.DB).then(console.log('db connected'));

const deleteAdmin = async ({ username, password }) => {
  const adminDB = await Admin.findOne({ username });
  if (!adminDB) {
    console.log(`Admin not registered with ${username} `);
    return;
  }
  if (!adminDB.username === username && !adminDB.password === password) {
    console.log('Please enter correct info');
    return;
  }
  try {
    await Admin.findOneAndDelete({ username });
    console.log('Admin Account deleted');
  } catch (error) {
    console.log(error);
  }
};

deleteAdmin({
  username: 'freestudentunion',
  password: 'oneforall',
});
