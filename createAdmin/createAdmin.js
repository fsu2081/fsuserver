const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');

require('dotenv').config();
mongoose.connect(process.env.DB).then(console.log('db connected'));

const createNewAdmin = async ({ username, password }) => {
  const adminDB = await Admin.findOne({ username });
  if (adminDB) {
    console.log('Admin already registered');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: hashedPassword });
  try {
    const newAdmin = await admin.save();
    if (newAdmin) {
      console.log('New admin registered with following details.');
      console.log(newAdmin);
    }
  } catch (error) {
    console.log(error);
  }
};

createNewAdmin({
  username: 'freestudentunion',
  password: 'oneforall',
});
