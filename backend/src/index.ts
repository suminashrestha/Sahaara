import app from "./app";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect";

dotenv.config();

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("something went wrong, app couldnt start", error);
    process.exit(1);
  }
};

start();
