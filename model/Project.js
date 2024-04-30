const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    // },
    content: {
      type: String,
    },
    // github: {
    //   type: String,
    // },
    // youtube: {
    //   type: String,
    // },
    // website: {
    //   type: String,
    // },
    // team: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     role: String,
    //     email: String,
    //   },
    // ],
  },
  { timestamps: true }
);

projectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', projectSchema);
