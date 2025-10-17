# RESTful API for Blog Platform

**Contributor:** SampleContributor
**Domain:** Backend
**Difficulty:** Intermediate
**Tech Stack:** Node.js, Express.js, MongoDB, JWT

## 📝 Description

A complete RESTful API for a blog platform with user authentication, CRUD operations for posts, comments, and user management. Includes JWT-based authentication, input validation, error handling, and MongoDB integration.

## 🎯 Features

- 🔐 **Authentication & Authorization**
  - User registration with password hashing
  - JWT-based login system
  - Protected routes with middleware
  - Role-based access control (Admin, User)

- 📝 **Blog Posts**
  - Create, read, update, delete posts
  - Pagination and sorting
  - Search functionality
  - Draft/Published status

- 💬 **Comments**
  - Add comments to posts
  - Nested replies support
  - Comment moderation

- 👤 **User Management**
  - User profiles
  - Update user information
  - Password reset functionality

- 📊 **Additional Features**
  - Request rate limiting
  - Input validation
  - Error handling middleware
  - API documentation (Swagger)
  - Unit and integration tests

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **dotenv** - Environment variables
- **morgan** - HTTP request logger
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

## 📁 Project Structure

```
blog-api/
├── src/
│   ├── config/
│   │   ├── database.js         # MongoDB connection
│   │   └── config.js           # App configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── postController.js   # Post CRUD operations
│   │   ├── commentController.js # Comment operations
│   │   └── userController.js   # User management
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Post.js             # Post schema
│   │   └── Comment.js          # Comment schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── posts.js            # Post routes
│   │   ├── comments.js         # Comment routes
│   │   └── users.js            # User routes
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   ├── validation.js       # Input validation
│   │   ├── errorHandler.js     # Error handling
│   │   └── rateLimiter.js      # Rate limiting
│   ├── utils/
│   │   ├── helpers.js          # Helper functions
│   │   └── constants.js        # Constants
│   └── app.js                  # Express app setup
├── tests/
│   ├── auth.test.js
│   ├── posts.test.js
│   └── comments.test.js
├── .env.example                # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🚀 How to Run

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the API**
   - API: `http://localhost:5000`
   - Docs: `http://localhost:5000/api-docs`

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout user
GET    /api/auth/me              # Get current user
POST   /api/auth/forgot-password # Request password reset
PUT    /api/auth/reset-password  # Reset password
```

### Posts
```
GET    /api/posts                # Get all posts (public)
GET    /api/posts/:id            # Get single post (public)
POST   /api/posts                # Create post (auth required)
PUT    /api/posts/:id            # Update post (auth required)
DELETE /api/posts/:id            # Delete post (auth required)
GET    /api/posts/search?q=term  # Search posts
```

### Comments
```
GET    /api/posts/:postId/comments     # Get all comments for a post
POST   /api/posts/:postId/comments     # Add comment (auth required)
PUT    /api/comments/:id               # Update comment (auth required)
DELETE /api/comments/:id               # Delete comment (auth required)
```

### Users
```
GET    /api/users/:id            # Get user profile
PUT    /api/users/:id            # Update user (auth required)
DELETE /api/users/:id            # Delete user (admin only)
```

## 💻 Code Examples

### User Model (Mongoose Schema)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### JWT Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};
```

### Post Controller
```javascript
const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Post.countDocuments({ status: 'published' });
    
    res.status(200).json({
      success: true,
      count: posts.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    const post = await Post.create(req.body);
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};
```

## 📚 Learning Outcomes

### Skills Developed
- **RESTful API Design**: Understanding REST principles and best practices
- **Authentication**: Implementing JWT-based authentication
- **Database Design**: Creating efficient MongoDB schemas with Mongoose
- **Error Handling**: Centralized error handling and validation
- **Security**: Implementing security best practices (helmet, rate limiting)
- **Testing**: Writing unit and integration tests
- **API Documentation**: Using Swagger for API documentation
- **Middleware**: Creating and using custom Express middleware

### Key Concepts Learned
- MVC architecture pattern
- Async/await and Promise handling
- MongoDB aggregation pipeline
- Password hashing and security
- Token-based authentication
- Input validation and sanitization
- HTTP status codes and responses
- Environment configuration
- Logging and monitoring

### Challenges Overcome
1. **Authentication Flow**: Implementing secure JWT authentication
2. **Data Validation**: Ensuring data integrity with proper validation
3. **Error Handling**: Creating consistent error responses
4. **Database Relations**: Managing relationships between users, posts, and comments
5. **Security**: Implementing rate limiting and other security measures

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ HTTP headers security with Helmet
- ✅ Rate limiting to prevent abuse
- ✅ Data validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ NoSQL injection prevention

## 🧪 Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/auth.test.js

# Run with coverage
npm run test:coverage
```

Example test:
```javascript
describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

## 📊 API Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "stack": "Error stack (only in development)"
}
```

## 🚀 Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create new app
heroku create your-app-name

# Add MongoDB Atlas add-on or use connection string
heroku config:set MONGODB_URI=your_mongodb_uri

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to Railway/Render
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

## 🔗 Live Demo

[View API Documentation](https://your-api-url.com/api-docs) *(Replace with actual link)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - free to use for learning and personal projects!

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

---

**Happy Coding! 🚀**

*This is a sample project for ProjectHive. Replace this content with your actual project details when contributing.*
