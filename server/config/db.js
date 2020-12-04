const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `DB connected successfully: ${connection.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.log(`${err.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
