const Notice = require('../model/Notice');

const handleNewNotice = async (req, res) => {
  console.log(req.body);
  // console.log(req.file);

  const title = req.body.title;
  const content = req.body.content;
  const image = req.file;

  let imageUrl;
  if (image) {
    imageUrl = image.destination + '/' + image.filename;
  }

  if (image && image.mimetype == 'application/pdf') {
    console.log('pdf upload');
    res.setHeader('Content-Type', 'application/pdf'); // Set content type to PDF
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${image.filename}"`
    ); // Display PDF inline in browser
  }

  if (!title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is a required field',
    });
  }
  try {
    const result = await Notice.create({
      title: title,
      image: imageUrl,
      content: content,
    });
    console.log('created');
    return res
      .status(201)
      .json({ status: 'success', message: 'New Notice is published' });
  } catch (error) {
    console.log(error);
  }
};

const getAllNotice = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    let allNotices;
    if (req.query.page == 'all') {
      allNotices = await Notice.find().sort({ createdAt: -1 });
      res.status(200).json(allNotices);
    } else {
      allNotices = await Notice.paginate(
        {},
        { page, limit, sort: { createdAt: -1 } }
      );
      console.log(allNotices);
      res.status(200).json(allNotices);
    }

    // Example Mongoose query to fetch notices in descending order
    // const allNotices = await Notice.find()
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);
  } catch (error) {
    console.log(error);
  }
};

const getSingleNotice = async (req, res) => {
  console.log(req.params.id);
  let notice;
  try {
    notice = await Notice.find({ _id: req.params.id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(notice[0]);
  } catch (error) {
    console.log(error);
  }
};

const getRecentNotice = async (req, res) => {
  try {
    const notice = await Notice.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(notice);
  } catch (error) {
    console.log(error);
  }
};

const deleteNotice = async (req, res) => {
  console.log(req.params.id);
  try {
    const notice = await Notice.deleteOne({ _id: req.params.id });
    res.status(200).json(notice);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleNewNotice,
  getAllNotice,
  getSingleNotice,
  getRecentNotice,
  deleteNotice,
};
