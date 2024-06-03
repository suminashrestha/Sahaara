import express from "express";
import cors from "cors";
import { userRoute } from "./routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoute);

app.get("/", (_, res) => {
  res.send("huehueuehu");
});

export default app;
