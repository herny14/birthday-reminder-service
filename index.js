import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.routes.js";

const app = express();

const mongoURL = "mongodb://host.docker.internal:27017/birthdayReminder";

app.use(express.json());

app.use("/", userRouter);


mongoose.set('strictQuery', true);

mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});