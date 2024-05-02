import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDB Already Connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
  }
};
