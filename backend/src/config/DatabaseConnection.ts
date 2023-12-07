import mongoose from "mongoose";

export const databaseConnection = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error(
      "MongoDb URI is not set in evironment variable file. Exiting..."
    );
  } else {
    await mongoose.connect(mongoUri);
    console.log("Connected to the mongoDb...");
  }
};
