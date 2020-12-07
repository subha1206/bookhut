const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasswordWithDB(password, user.password))) {
    return next(new AppError('Incorrect Email or password', 401));
  }

  const token = signToken(user._id);

  const cookieOpt = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOpt.secure = true;

  res.cookie('jwt', token, cookieOpt);

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    user,
    message: 'Login successfull',
  });
});

exports.protectedRoute = catchAsyncError(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'Aha! looks like you are not logged in, please log in to view the content',
        401
      )
    );
  }

  const decodedJWT = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decodedJWT.id);

  if (!currentUser) {
    return next(new AppError('Oops! look like this user does not exists', 401));
  }

  // if (currentUser.checkIfPasswordChanged(decodedJWT.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  req.user = currentUser;
  next();
});
