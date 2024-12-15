// const Gallery = require('../model/Gallery');

// const addNewGallery = async (req, res) => {
//   const event = req.body.name;
//   const images = [];
//   const fileUrls = req.files.map((file) => {
//     const url = file.destination + '/' + file.filename;
//     images.push(url);

//     return {
//       originalName: file.originalname,
//       url: url,
//     };
//   });
//   //   console.log(images);
//   try {
//     const result = await Gallery.create({
//       event: event,
//       images: images,
//     });
//     res.status(201).json({
//       status: 'success',
//       message: 'Gallery for an event is uploaded',
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'error',
//       message: error,
//     });
//   }
// };

// const getAllGallery = async (req, res) => {
//   try {
//     const gallery = await Gallery.find();
//     // console.log(gallery);

//     if (!gallery) {
//       return res
//         .status(401)
//         .json({ status: 'error', message: 'No gallery to fetch' });
//     }
//     return res.status(200).json(gallery);
//   } catch (error) {
//     res.status(400).json({ status: 'error', message: error.message });
//   }
// };

// const getGalleryById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const gallery = await Gallery.findById({ _id: id });
//     return res.status(200).json(gallery);
//   } catch (error) {
//     res.status(400).json({ status: 'error', message: error.message });
//   }
// };

// const updateGallery = async (req, res) => {
//   const id = req.params.id;
//   const event = req.body.name;
//   const images = [];
//   const fileUrls = req.files.map((file) => {
//     const url = file.destination + '/' + file.filename;
//     images.push(url);

//     return {
//       originalName: file.originalname,
//       url: url,
//     };
//   });
//   //   console.log(images);
//   try {
//     const updatedGallery = await Gallery.findByIdAndUpdate(
//       id,
//       {
//         $push: { images: { $each: images } },
//         event: event,
//       },
//       { new: true }
//     );

//     if (!updatedGallery) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Gallery not found',
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       message: 'Gallery updated with new images',
//       updatedGallery,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'error',
//       message: error,
//     });
//   }
// };

// module.exports = {
//   addNewGallery,
//   getAllGallery,
//   getGalleryById,
//   updateGallery,
//   deleteGallery,
// };

const Gallery = require("../model/Gallery");
const fs = require("fs");
const path = require("path");
const GalleryImage = require("../model/GalleryImage");

exports.createGallery = async (req, res) => {
  try {
    const { title, event_id } = req.body;
    const file = req.file;
    const thumbnail_url = file.destination + "/" + file.filename;

    if (!title) {
      return res.status(400).json({
        status: "error",
        message: "Title is required",
      });
    }
    const gallery = new Gallery({
      title,
      event_id: event_id || null,
      thumbnail_url,
    });
    const savedGallery = await gallery.save();
    res.status(201).json({ status: "success", data: savedGallery });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json({ status: "success", data: galleries });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery not found" });
    }
    res.status(200).json({ status: "success", data: gallery });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const galleryImages = await GalleryImage.find({
      gallery_id: req.params.id,
    });

    if (galleryImages.length > 0) {
      galleryImages.forEach((image) => {
        const filePath = path.resolve(__dirname, "../", image.image_url); // Adjust path as needed
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file ${filePath}:`, err);
          }
        });
      });

      await GalleryImage.deleteMany({ gallery_id: req.params.id });
    }

    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery not found" });
    }

    if (gallery.thumbnail_url) {
      const thumbnailPath = path.resolve(
        __dirname,
        "../",
        gallery.thumbnail_url
      );
      fs.unlink(thumbnailPath, (err) => {
        if (err) {
          console.error(
            `Failed to delete thumbnail file ${thumbnailPath}:`,
            err
          );
        }
      });
    }

    await Gallery.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Gallery and its images deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
