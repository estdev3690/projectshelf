import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { app } from "./app.js";
import connectDB from "./db/index.js";
import healthRouter from "./routes/health.js";
import portfolioRouter from "./routes/portfolio.js";

const PORT = process.env.PORT || 7000;

// Health check endpoint before DB connection
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });
})
.catch((err) => {
    console.log('mongo db connection error..', err);
});

app.use('/api', healthRouter);
app.use('/api', portfolioRouter); // Make sure this line exists