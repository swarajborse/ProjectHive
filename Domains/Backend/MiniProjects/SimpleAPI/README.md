# 🚀 Simple REST API

**Contributor:** SampleContributor  
**Domain:** Backend  
**Difficulty:** Beginner  
**Tech Stack:** Node.js, Express.js

---

## 📝 Description

A simple REST API built with Node.js and Express.js that demonstrates basic CRUD operations for managing a list of books. Perfect for beginners learning backend development and API design.

---

## 🎯 Features

- ✅ Get all books (GET)
- ✅ Get single book by ID (GET)
- ✅ Create new book (POST)
- ✅ Update book (PUT)
- ✅ Delete book (DELETE)
- ✅ Input validation
- ✅ Error handling
- ✅ In-memory data storage
- ✅ RESTful API design
- ✅ CORS enabled

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Body-parser** - Parse request bodies

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

4. **Test the API**
   - Use Postman, Thunder Client, or curl
   - Or use the included test.http file (with REST Client VS Code extension)

---

## 📁 Project Structure

```
SimpleAPI/
├── server.js           # Main server file
├── package.json        # Dependencies
├── test.http          # API testing file
├── README.md          # Documentation
└── .gitignore         # Git ignore file
```

---

## 📡 API Endpoints

### Get All Books
```http
GET http://localhost:3000/api/books
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925
    }
  ]
}
```

### Get Single Book
```http
GET http://localhost:3000/api/books/1
```

### Create New Book
```http
POST http://localhost:3000/api/books
Content-Type: application/json

{
  "title": "1984",
  "author": "George Orwell",
  "year": 1949
}
```

### Update Book
```http
PUT http://localhost:3000/api/books/1
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2024
}
```

### Delete Book
```http
DELETE http://localhost:3000/api/books/1
```

---

## 💻 Code Highlights

### Express Server Setup
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### CRUD Operations
```javascript
// GET all books
app.get('/api/books', (req, res) => {
    res.json({
        success: true,
        count: books.length,
        data: books
    });
});

// POST new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;
    const newBook = { id: Date.now(), title, author, year };
    books.push(newBook);
    res.status(201).json({ success: true, data: newBook });
});
```

---

## 📚 Learning Outcomes

### Skills Practiced
- ✅ Express.js basics
- ✅ RESTful API design
- ✅ HTTP methods (GET, POST, PUT, DELETE)
- ✅ Request/Response handling
- ✅ JSON data manipulation
- ✅ Error handling
- ✅ Middleware usage

### Concepts Learned
- REST API principles
- HTTP status codes
- Request validation
- Data structures in Node.js
- Asynchronous JavaScript

---

## 🎨 Enhancement Ideas

Want to improve this project? Try adding:

1. **Database Integration** - MongoDB or PostgreSQL
2. **Authentication** - JWT tokens
3. **Validation** - Express-validator
4. **Pagination** - Limit and offset
5. **Search & Filter** - Query parameters
6. **Logging** - Morgan or Winston
7. **Testing** - Jest or Mocha
8. **Documentation** - Swagger/OpenAPI

---

## 🧪 Testing

### Using curl
```bash
# Get all books
curl http://localhost:3000/api/books

# Create new book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","year":2024}'
```

### Using REST Client (VS Code)
Install "REST Client" extension and use the `test.http` file.

---

## 🚀 Future Enhancements

- [ ] Add MongoDB integration
- [ ] Implement authentication
- [ ] Add input validation
- [ ] Create unit tests
- [ ] Add API documentation
- [ ] Implement rate limiting

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Report issues
- Suggest improvements
- Use as learning material

---

**Happy Coding! 🚀**
