import { app } from "./app";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY env must be defined.");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI env must be defined.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
