import mongoose from "mongoose";

const dbConnect = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("db connected successfully");
  } catch (error) {
    console.log("error in db connection", error);
    process.exit(1); //exit successfully
  }
};

export default dbConnect;
