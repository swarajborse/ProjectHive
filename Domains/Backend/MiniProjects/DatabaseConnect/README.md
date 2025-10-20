**Contributor:** Ogagaoghene Esavwede
**Domain:** Backend
**Difficulty:** Beginner–Intermediate
**Tech Stack:** Node.js, Express.js, Mongoose

# 🗄️ Express + Mongoose Database Connection

---

## 📝 Description

A simple Express.js application demonstrating how to **connect to MongoDB using Mongoose** and **set up event listeners** for key database connection states.
This project helps you understand how to manage and monitor your MongoDB connection lifecycle effectively.

---

## 🎯 Features

- ✅ Connects to MongoDB using **Mongoose**
- ✅ Monitors key connection events like `connected`, `disconnected`, `error`, etc.
- ✅ Automatically reconnects on disconnection
- ✅ Provides clear console feedback for database connection status
- ✅ Easily configurable via environment variables

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **Mongoose** – ODM for MongoDB

---

## 🚀 How to Run

### Prerequisites

- Node.js installed (v14 or higher)
- MongoDB running locally or in the cloud
- npm package manager

### Installation Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start MongoDB**

   Make sure MongoDB is running locally or update your `.env` file with your connection URI.

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
mongoose-connection/
├── src/
│   ├── app.js             # Main Express application
│   └── database.js        # MongoDB connection and event listeners
├── package.json           # Dependencies and scripts
├── .gitignore             # Git ignore file
└── README.md              # Documentation
```

---

## 📡 Example Usage

### app.js

```javascript
import express from "express";
import connectToDatabase from "./database.js";

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectToDatabase();

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "hello" });
});

app.listen(PORT, () => {
  console.log("Server listening on PORT: " + PORT);
});
```

---

### database.js

```javascript
import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    const DB_URI = "mongodb://localhost:27017/mysampledb";

    // Event listeners
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to database");
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });

    mongoose.connection.on("disconnecting", () => {
      console.log("Disconnecting from database");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from database");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("Reconnected to database");
    });

    mongoose.connection.on("close", () => {
      console.log("Database connection closed");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Database Error:", error);
    });

    await mongoose.connect(process.env.DB_URI || DB_URI);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
```

---

## 💻 Code Comparison

### ❌ Old Way (Without Event Handling)

```javascript
mongoose.connect("mongodb://localhost:27017/mysampledb");
console.log("Database connected");
```

### ✅ New Way (With Event Listeners)

```javascript
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
```

---

## 📚 Learning Outcomes

### Skills Practiced

- ✅ Setting up MongoDB connection with Mongoose
- ✅ Handling connection lifecycle events
- ✅ Error handling in database connections
- ✅ Writing modular database connection logic

### Concepts Learned

- Mongoose connection states
- Event-driven database monitoring
- Using environment variables for database URIs
- Clean separation of app logic and database logic

---

## 🎨 Enhancement Ideas

Want to improve this project? Try adding:

1. **Logger Integration** – Replace `console.log` with Pino or Winston
2. **Retry Mechanism** – Automatically reconnect after disconnection
3. **Configuration File** – Manage DB settings via a config folder
4. **Cloud Connection** – Connect to MongoDB Atlas with credentials
5. **Health Check Route** – Add an endpoint to monitor DB connection status

---

## 🧪 Testing

### Using curl

```bash
curl http://localhost:3000/
```

**Terminal Output:**

```
Connecting to database
Connected to database
Server listening on PORT: 3000
```

---

## 🚀 Future Enhancements

- [ ] Add retry logic for failed connections
- [ ] Add proper logging system
- [ ] Implement graceful shutdown
- [ ] Integrate with a cloud-based MongoDB

---

## 📄 License

MIT License — Free to use and modify!

---

## 🤝 Contributing

This project is open-source and created to help developers **learn how to connect Mongoose with Express and handle database events cleanly**.

Feel free to:

- Fork and enhance
- Report issues
- Suggest improvements
- Use it as a MongoDB starter template

---

Would you like me to add your **LinkedIn and GitHub profile links** to the “Contributor” section too (like in your other README)?
