const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://harnishmohan:H22122002h@blogcluster.iemukkp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
