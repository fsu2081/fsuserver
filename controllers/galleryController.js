const Gallery = require('../model/Gallery');

const addNewGallery = async (req, res) => {
  const event = req.body.name;
  const images = [];
  const fileUrls = req.files.map((file) => {
    const url = file.destination + '/' + file.filename;
    images.push(url);

    return {
      originalName: file.originalname,
      url: url,
    };
  });
  //   console.log(images);
  try {
    const result = await Gallery.create({
      event: event,
      images: images,
    });
    res.status(201).json({
      status: 'success',
      message: 'Gallery for an event is uploaded',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    // console.log(gallery);

    if (!gallery) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No gallery to fetch' });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getGalleryById = async (req, res) => {
  const id = req.params.id;
  try {
    const gallery = await Gallery.findById({ _id: id });
    return res.status(200).json(gallery);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateGallery = async (req, res) => {
  const id = req.params.id;
  const event = req.body.name;
  const images = [];
  const fileUrls = req.files.map((file) => {
    const url = file.destination + '/' + file.filename;
    images.push(url);

    return {
      originalName: file.originalname,
      url: url,
    };
  });
  //   console.log(images);
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        $push: { images: { $each: images } },
        event: event,
      },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({
        status: 'error',
        message: 'Gallery not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Gallery updated with new images',
      updatedGallery,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

const deleteGallery = async (req, res) => {
  //   console.log(req.params.id);
  try {
    const gallery = await Gallery.deleteOne({ _id: req.params.id });
    // console.log(gallery);
    res.status(200).json(gallery);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
};
