import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import {
  adoptionPostRoute,
  profileRoute,
  rescuePostRoute,
  stripeRoute,
  userRoute,
  volunteerPostRoute,
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/rescue-posts", rescuePostRoute);
app.use("/api/v1/adoption-posts", adoptionPostRoute);
app.use("/api/v1/volunteer-posts", volunteerPostRoute);
app.use("/create-checkout-session", stripeRoute);

app.use(errorHandler);

export default app;
