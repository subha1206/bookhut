const multer = require('multer');
const cloudinary = require('cloudinary');
const User = require('../models/User');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

var storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const parser = multer({ storage: storage });

exports.upload = parser.single('photo');

exports.uploadUserPhoto = catchAsyncError(async (req, res, next) => {
  const img = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: 'bookhut',
    width: 400,
    height: 400,
    crop: 'limit',
  });

  if (!img) {
    return next(new AppError('something went wrong', 400));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      photo: img.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  //   if (req.body.password || req.body.passwordConfirm) {
  //     return next(
  //       new AppError(
  //         'This route is not for password updates. Please use /updateMyPassword.',
  //         400
  //       )
  //     );
  //   }

  //   const filteredBody = filterObj(req.body, 'name', 'email');
  // if (req.file) req.body.photo = req.file.filename;
  console.log(req.file.url);

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});
