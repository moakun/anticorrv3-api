const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(
      process.env.DB_CONNECT,
      { useNewUrlParser: true },
      (err) => {
        if (err) console.log(err);
        else console.log('mongdb is connected');
      }
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
