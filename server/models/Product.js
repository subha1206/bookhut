const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userImg: { type: String, required: true },
    review: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  avgRating: {
    type: Number,
    required: true,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
