const mongoose = require("mongoose");

module.exports = {
  connectDB: async function() {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION_URL);
      const connection = mongoose.connection;
      connection.once("open", () => {
        console.log("MongoDB database connection established successfully");
      });
    } catch (error) {
      console.log("Error while connecting to the database:", error.message);
    }
  }
};