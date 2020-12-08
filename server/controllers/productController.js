const Product = require('../models/Product');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: newProduct,
  });
});

exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    data: products,
  });
});

exports.createReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const { review } = req.body;
  const duplicateReview = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (duplicateReview) {
    return next(new AppError('You already reviewed the product', 400));
  }
  const reviewBody = {
    review,
    user: req.user._id,
    userName: req.user.name,
    userImg: req.user.photo,
  };

  product.reviews.push(reviewBody);
  product.numOfReviews = product.reviews.length;

  await product.save();

  res.status(201).json({
    status: 'success',
    message: 'Review added',
    data: product,
  });
});
