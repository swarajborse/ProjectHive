import express from "express";
import logger from "./logging/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Info Logging
app.get("/", (req, res) => {
  logger.info("User hit home route");
  res.status(200).json({ success: "true", message: "Welcome to the server" });
});

// Error Logging
app.get("/error", (req, res) => {
  try {
    logger.info("Error Route hit");
    logger.info("This Route forces an error");
    throw new Error("Forced Error");
  } catch (e) {
    logger.error(e, "Force Error Route Hit");
    res.status(500).json({ success: "false", message: "Server Error" });
  }
});

app.listen(PORT, () => {
  logger.info("Server running and listening on PORT: " + PORT);
});
