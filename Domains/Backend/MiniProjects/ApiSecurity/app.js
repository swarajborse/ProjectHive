import express from "express";
import expressRateLimiter from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || "3000";

/* middleware */

// Parsing
app.use(express.json());
app.use(express.urlencoded());

// Security
app.use(
  cors({
    // 🔑 Only requests from this origin will be allowed
    origin: "http://localhost:3000",
    // Specify which HTTP methods are allowed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // Allow the server to send and receive cookies with requests
    credentials: true,
    // Specify which headers are allowed on the request
    allowedHeaders: "Content-Type,Authorization,X-Requested-With",
  })
);

// Set security headers
app.use(helmet());

// rate limiting
const rateLimiter = expressRateLimiter({
  windowMs: 1 * 60 * 1000, // 1 min (time window)
  max: 1, // Limit each IP to 100 requests per `windowMs`
  standardHeaders: "draft-7", // Draft 7 compliant headers
  legacyHeaders: false, // Disable the deprecated X-RateLimit-* headers
  message: "Too many requests from this IP, please try again after 15 minutes", // Custom message
});

app.use(rateLimiter);

// routes
app.get("/", (req, res) => {
  console.log("Home Route Hit");
  res.status(200).json({ success: true, message: "hello" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running and listening on PORT: ${PORT}`);
});
