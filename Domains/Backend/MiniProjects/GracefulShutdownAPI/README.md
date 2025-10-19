**Contributor:** Ogagaoghene Esavwede
**Domain:** Backend
**Difficulty:** Intermediate
**Tech Stack:** Node.js, Express.js, Mongoose

# 🚀 Graceful Shutdown Server with MongoDB

---

## 📝 Description

A robust Node.js and Express.js server designed with **graceful shutdown**, **error handling**, and **MongoDB connection management** using Mongoose.
This project demonstrates how to properly handle process-level errors, clean up resources, and ensure database connections are closed before the server exits — an essential pattern for production-grade systems.

---

## 🎯 Features

- ✅ Express server setup
- ✅ MongoDB connection using Mongoose
- ✅ Graceful shutdown using @godaddy/terminus
- ✅ Handles `SIGINT` and `SIGTERM` signals
- ✅ Handles uncaught exceptions and unhandled promise rejections
- ✅ Environment variable configuration
- ✅ Clean console logging

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - ODM for MongoDB
- **@godaddy/terminus** - Graceful shutdown handling

---

## 🚀 How to Run

### Prerequisites

- Node.js installed (v14 or higher)
- MongoDB installed and running locally or accessible via URI

### Installation Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```bash
   MONGO_URI=mongodb://localhost:27017/gracefulShutdownDB
   PORT=3000
   ```

3. **Start the server**

   ```bash
   npm start
   ```

4. **Server runs at**

   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
GracefulServer/
├── app.js               # Main server file
├── database/
│   └── database.js      # MongoDB connection logic
├── package.json         # Dependencies and scripts
├── .gitignore           # Git ignore file
└── README.md            # Documentation
```

---

## 📡 API Endpoints

### Root Route

```http
GET http://localhost:3000/
```

**Response:**

```json
"Hello, World!"
```

---

## 💻 Code Highlights

### Express Server Setup

```javascript
import express from "express";
import { createTerminus } from "@godaddy/terminus";
import connectDB from "./database/database.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

### Graceful Shutdown Logic

```javascript
const onSignal = async () => {
  console.log("Server is starting cleanup...");
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
```

---

### Error Handling

```javascript
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});
```

---

## 📚 Learning Outcomes

### Skills Practiced

- ✅ Graceful shutdown implementation
- ✅ Handling process-level signals (`SIGINT`, `SIGTERM`)
- ✅ Managing database connections with Mongoose
- ✅ Error handling in Node.js
- ✅ Clean project structure

### Concepts Learned

- Process lifecycle in Node.js
- Safe server shutdown techniques
- Resource cleanup and reliability patterns
- Environment variable configuration

---

## 🎨 Enhancement Ideas

1. **Add Routes and Controllers** – Expand to handle multiple endpoints
2. **Add Logging** – Use Winston or Pino for structured logs
3. **Add Health Check Endpoint** – For container orchestration (Kubernetes)
4. **Integrate a Config Library** – Like dotenv or config
5. **Add Monitoring Tools** – Integrate metrics or alerting

---

## 🧪 Testing

### Using curl

```bash
# Get root route
curl http://localhost:3000/
```

### Using Browser or Postman

Visit:

```
http://localhost:3000/
```

Expected output:

```
Hello, World!
```

---

## 🚀 Future Enhancements

- [ ] Add environment-based config (dev, prod)
- [ ] Add health check and readiness probes
- [ ] Add structured logging
- [ ] Add centralized error handling middleware
- [ ] Containerize with Docker

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample backend project built for learning **graceful shutdown patterns** in Node.js.
Feel free to:

- Fork and enhance
- Report issues
- Suggest improvements
- Use as a reference for production servers

---
