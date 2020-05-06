const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },

    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

blogSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
