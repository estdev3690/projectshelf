import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

// Configure CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Configure express to handle JSON and form data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // for serving static files

// Routes
app.use("/api/v1/users", userRouter);

export { app };