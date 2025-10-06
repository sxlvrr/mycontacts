const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error("Erreur MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;