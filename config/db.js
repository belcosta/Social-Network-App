const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //connect return Promise → async/await needed
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
