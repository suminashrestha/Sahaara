import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/user.route";
import { authenticateWithJwt } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);

app.get("/iii", authenticateWithJwt, (req, res) => {
  res.send("iiiiiiiiiiiiii");
});

app.get("/", (_, res) => {
  res.send("huehueuehu");
});

export default app;
