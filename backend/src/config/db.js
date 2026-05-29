const mongoose = require("mongoose");
const dns = require("dns");

// Force Google DNS so SRV lookups work even on restrictive networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async (retries = 5) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log("MongoDB Connected");
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i}/${retries} failed:`, error.message);
      if (i === retries) {
        console.error("All connection attempts failed. Exiting.");
        process.exit(1);
      }
      // Wait 3 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

module.exports = connectDB;