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

  res.status(201).json({
    status: 'success',
    data: product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(201).json({
    status: 'success',
    data: products,
  });
});
