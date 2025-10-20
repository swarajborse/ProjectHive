**Contributor:** Ogagaoghene Esavwede
**Domain:** Backend
**Difficulty:** Intermediate
**Tech Stack:** Node.js, Express.js, Helmet, CORS, Express Rate Limiter

# 🛡️ Secure Express Server

---

## 📝 Description

A simple **Express.js** server demonstrating how to implement **basic security practices** — including **CORS restrictions**, **security headers**, and **rate limiting**.

This project helps backend developers understand how to secure their APIs from common web vulnerabilities such as unauthorized access, data leaks, and denial-of-service attacks.

---

## 🎯 Features

- ✅ Request body parsing
- ✅ Cross-Origin Resource Sharing (CORS) configuration
- ✅ HTTP security headers via Helmet
- ✅ Request rate limiting
- ✅ Custom rate limit response messages
- ✅ Error prevention from excessive requests
- ✅ Clean and maintainable middleware setup

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **Helmet** – Security headers
- **CORS** – Cross-origin request protection
- **Express-rate-limiter** – Rate limiting middleware

---

## 🚀 How to Run

### Prerequisites

- Node.js installed (v14 or higher)
- npm or yarn

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

---

## 📁 Project Structure

```
SecureServer/
├── node_modules/
├── src/
│   └── app.js              # Main Express server file
├── package.json            # Dependencies and scripts
├── .gitignore              # Git ignore file
└── README.md               # Documentation
```

---

## 📡 Example Code

### app.js

```javascript
import express from "express";
import expressRateLimiter from "express-rate-limiter";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || "3000";

/* middleware */

// Parsing
app.use(express.json());
app.use(express.urlencoded());

// Security - CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization,X-Requested-With",
  })
);

// Set security headers
app.use(helmet());

// Rate limiting
const rateLimiter = expressRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(rateLimiter);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "hello" });
});

app.listen(PORT, () => {
  console.log(`Server running and listening on PORT: ${PORT}`);
});
```

---

## 🔐 Security Concepts Explained

### 1. 🧱 CORS (Cross-Origin Resource Sharing)

Prevents unwanted domains from making requests to your API.
**Example:**

```javascript
app.use(cors({ origin: "http://localhost:3000" }));
```

✅ Only allows requests from `http://localhost:3000`.

---

### 2. 🪖 Helmet

Adds HTTP security headers like:

- `X-Content-Type-Options`
- `X-DNS-Prefetch-Control`
- `Strict-Transport-Security`
- `Content-Security-Policy` (optional)

**Example:**

```javascript
app.use(helmet());
```

This helps prevent XSS, clickjacking, and MIME-type sniffing attacks.

---

### 3. 🚦 Rate Limiting

Prevents brute-force attacks and API abuse by limiting the number of requests per IP address.

**Example:**

```javascript
const rateLimiter = expressRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
});
```

If exceeded, users receive:

```json
{
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

---

## 💻 Test the Security Setup

### Using curl

```bash
# Send a normal request
curl http://localhost:3000/

# Send multiple requests quickly to test rate limiting
for i in {1..120}; do curl -s http://localhost:3000/; done
```

After the 100th request, you’ll receive:

```
Too many requests from this IP, please try again after 15 minutes
```

---

## 📚 Learning Outcomes

### Skills Practiced

- ✅ Setting up security middlewares
- ✅ Understanding and applying HTTP security headers
- ✅ Implementing rate limiting for APIs
- ✅ Managing CORS configurations
- ✅ Preventing abuse and common vulnerabilities

### Concepts Learned

- API access control
- Browser security model
- Basic OWASP top 10 mitigation techniques
- Secure Express.js middleware configuration

---

## 🎨 Enhancement Ideas

1. **Add Environment Config** – Configure CORS origins via `.env`
2. **Add Logging** – Log blocked or rate-limited requests
3. **Add Helmet CSP** – Define `Content-Security-Policy`
4. **Add HTTPS** – Use SSL certificates
5. **Add JWT Authentication** – For endpoint-level protection

---

## 🚀 Future Enhancements

- [ ] Add per-user rate limits
- [ ] Add global error handler for security violations
- [ ] Integrate Pino logger
- [ ] Add request validation (e.g., Joi or Zod)
- [ ] Implement CSRF protection

---

## 📄 License

MIT License — Free to use and modify!

---

## 🤝 Contributing

This project is a **learning guide** for developers implementing **basic security in Express.js**.
Feel free to:

- Fork and improve
- Add new security layers
- Submit pull requests
- Use this as a starting point for production APIs

---

**Secure Coding Starts Here. 🛡️✨**
