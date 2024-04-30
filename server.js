const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const requireAdminAuth = require('./requireAdminAuth');

//setting cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

//connecting mongodb
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('db connected'));

//Routes
app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

//admin authentication routes
app.use('/admin', require('./routes/admin'));

//protect routes

//Other admin routes
app.use('/admin/notice/', require('./routes/notice'));
app.use('/admin/event/', require('./routes/event'));
app.use('/admin/project/', require('./routes/project'));
app.use('/gallery', require('./routes/gallery'));

// setting port for server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
