**Contributor:** Ogagaoghene Esavwede
**Domain:** Backend
**Difficulty:** Beginner–Intermediate
**Tech Stack:** Node.js, Express.js, Pino

# 🚀 Express Logging Server with Pino

---

## 📝 Description

A simple Express.js server that replaces all `console.log` statements with a **structured logging system** using **Pino** — a fast, production-grade logging library for Node.js.
This project demonstrates how to create a centralized logger, use it throughout your app, and log useful events like route access and server startup.

---

## 🎯 Features

- ✅ Centralized logger configuration
- ✅ Structured JSON logs
- ✅ Replaces `console.log` with `logger.info`, `logger.error`, etc.
- ✅ Lightweight and high performance (using Pino)
- ✅ Works in production and development environments
- ✅ Easily extensible for file or external log management

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **Pino** – Fast JSON logger

---

## 🚀 How to Run

### Prerequisites

- Node.js installed (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the server**

   ```bash
   npm start
   ```

3. **Server runs at**

   ```
   http://localhost:3000
   ```

4. **See logs in terminal**

   ```
   {"level":30,"time":1729325400000,"msg":"Server running and listening on PORT: 3000","pid":12345,"hostname":"localhost"}
   ```

---

## 📁 Project Structure

```
logging/
├── src/
│   ├── app.js               # Main Express server file
│   └── logging/
│       └── logger.js        # Centralized logger configuration
├── package.json             # Dependencies and scripts
├── .gitignore               # Git ignore file
└── README.md                # Documentation
```

---

## 📡 Example Usage

### app.js

```javascript
import express from "express";
import logger from "./logging/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  logger.info("User hit home route");
  res.status(200).json({ success: true, message: "Welcome to the server" });
});

app.listen(PORT, () => {
  logger.info("Server running and listening on PORT: " + PORT);
});
```

### logger.js

```javascript
import pino from "pino";

const logger = pino({
  level: "info",
});

export default logger;
```

---

## 💻 Code Comparison

### ❌ Old Way (Using `console.log`)

```javascript
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
```

### ✅ New Way (Using `logger.info`)

```javascript
app.listen(PORT, () => {
  logger.info("Server running and listening on PORT: " + PORT);
});
```

---

## 📚 Learning Outcomes

### Skills Practiced

- ✅ Structured logging in Node.js
- ✅ Using Pino for performance logging
- ✅ Creating reusable log modules
- ✅ Logging best practices

### Concepts Learned

- Importance of centralized logging
- Structured vs. unstructured logs
- Logging levels (`info`, `warn`, `error`, `debug`)
- Environment-based logging strategies

---

## 🎨 Enhancement Ideas

Want to improve this project? Try adding:

1. **Pretty Logs** – Use `pino-pretty` for human-readable logs

   ```bash
   npm install pino-pretty
   npm start | npx pino-pretty
   ```

2. **File Logging** – Pipe logs into a file:

   ```bash
   node src/app.js > server.log
   ```

3. **Environment-specific Levels** – Use `debug` level in dev, `info` in prod
4. **HTTP Request Logging** – Combine Pino with `pino-http`
5. **Error Tracking** – Send logs to monitoring tools like Logtail, Datadog, or Sentry

---

## 🧪 Testing

### Using curl

```bash
curl http://localhost:3000/
```

**Terminal Output:**

```bash
{"level":30,"time":1729325400000,"msg":"User hit home route","pid":12345,"hostname":"localhost"}
```

---

## 🚀 Future Enhancements

- [ ] Add pretty-print logs in development
- [ ] Add log file rotation
- [ ] Add request logging middleware
- [ ] Add error logging middleware
- [ ] Add environment-based log filtering

---

## 📄 License

MIT License — Free to use and modify!

---

## 🤝 Contributing

This project is open-source and created to help developers learn **how to replace `console.log` with a proper logger** in Node.js applications.
Feel free to:

- Fork and enhance
- Report issues
- Suggest improvements
- Use it as a logging starter template

---
