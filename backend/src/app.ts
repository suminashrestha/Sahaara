import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/user.route";
import { adoptionPostRoute } from "./routes/adoption-post.route";
import errorHandler from "./middlewares/errorHandler";
import { rescuePostRoute } from "./routes/rescue-post.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/adoption-posts", adoptionPostRoute);
app.use("/api/v1/rescue-posts", rescuePostRoute);
app.use(errorHandler);

export default app;
