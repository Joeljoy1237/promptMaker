import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("====================================");
    console.log("Database sucessfully connected");
    console.log("====================================");
  }

  try {
    await mongoose.connect(process.env.MANGODB_URL, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("====================================");
    console.log("Sucessfully connected");
    console.log("====================================");
  } catch (error) {
    console.log(error);
  }
};
