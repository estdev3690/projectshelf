import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://projectshelf-psi.vercel.app'
  ],
  credentials: true
}));

// Configure express to handle JSON and form data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // for serving static files

// Routes
app.use("/api/v1/users", userRouter);

export { app };