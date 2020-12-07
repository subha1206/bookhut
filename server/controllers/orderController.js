const Razorpay = require('razorpay');
const Order = require('../models/Order');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    payMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    return next(new AppError('No oreder items', 400));
  }

  const createdOrder = await Order.create({
    orderItems,
    shippingAddress,
    payMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: createdOrder,
  });
});

exports.getOneOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new AppError('Order not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!order) {
    return next(new AppError('Order not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.initiatePayment = catchAsyncError(async (req, res, next) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: req.params.id,
  };
  const response = await razorpay.orders.create(options);

  res.json({
    status: 'Initiated',
    id: response.id,
    currency: response.currency,
    amount: response.amount,
  });
});

exports.getMyOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.status(200).json({
    status: 'success',
    orders,
  });
});
