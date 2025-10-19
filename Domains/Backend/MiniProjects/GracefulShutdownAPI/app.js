import express from "express";
import { createTerminus } from "@godaddy/terminus";
import connectDB from "./database/database.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

/* Express Routes */
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* Process Level Errors */

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

/* Graceful Shutdown Handlers */
const onSignal = async () => {
  console.log("Server is starting cleanup...");
  // Perform cleanup tasks like closing DB connections here
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
};

const onShutdown = () => {
  console.log("Cleanup finished, server is shutting down.");
};

createTerminus(server, {
  signals: ["SIGINT", "SIGTERM"],
  onSignal,
  onShutdown,
  timeout: 10000,
});

export default app;
