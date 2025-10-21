import express from "express";
import connectToDB from "./database.js";

const app = express();
const PORT = 3000;

// connect to database
connectToDB();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  console.log("home route hit");
  res.status(200).json({ success: true, message: "hello" });
});

app.listen(PORT, () => {
  console.log("Server listening on PORT: " + PORT);
});
