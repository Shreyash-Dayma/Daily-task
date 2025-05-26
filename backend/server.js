import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

// Load env variables before using them
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined in .env file");
  process.exit(1);
}

// MongoDB connection with options
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Add error handler for MongoDB connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
