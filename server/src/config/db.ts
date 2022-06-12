import mongoose from "mongoose";

export const connectMongo = async () => {
  await mongoose.connect(process.env.DB_URI || "");

  console.log("Connected to MongoDB");
};
