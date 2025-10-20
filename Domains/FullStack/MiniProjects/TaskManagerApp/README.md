# 🚀 Full-Stack Task Manager Application

**Contributor:** Tejas-Santosh-Nalawade  
**Domain:** FullStack  
**Difficulty:** Intermediate  
**Tech Stack:** React.js, Node.js, Express.js, MongoDB, JWT Authentication

---

## 📝 Description

A complete full-stack task management application with user authentication, CRUD operations, and real-time updates. Features a modern React frontend, RESTful Express backend, MongoDB database, and JWT-based authentication.

---

## 🎯 Features

### Frontend
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All/Active/Completed)
- ✅ Search functionality
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Protected routes

### Backend
- ✅ RESTful API architecture
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ MongoDB database integration
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Environment configuration

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variables

---

## 🚀 How to Run

### Prerequisites
- Node.js 14+ and npm
- MongoDB installed and running
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd Domains/FullStack/MiniProjects/TaskManagerApp/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB

   # On Mac/Linux
   sudo systemctl start mongod
   ```

5. **Run backend server**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (new terminal)
   ```bash
   cd Domains/FullStack/MiniProjects/TaskManagerApp/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start frontend**
   ```bash
   npm start
   ```

   App will open on `http://localhost:3000`

---

## 📁 Project Structure

```
TaskManagerApp/
├── backend/
│   ├── server.js              # Entry point
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   └── tasks.js          # Task routes
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            # Main component
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskItem.js
│   │   │   └── TaskForm.js
│   │   ├── services/
│   │   │   └── api.js        # API calls
│   │   └── utils/
│   │       └── auth.js       # Token management
│   ├── package.json
│   └── .env
└── README.md
```

---

## 💻 API Endpoints

### Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login user
GET  /api/auth/me          - Get current user
```

### Tasks (Protected)
```
GET    /api/tasks          - Get all user tasks
POST   /api/tasks          - Create new task
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
PATCH  /api/tasks/:id/toggle - Toggle task completion
```

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (low/medium/high),
  dueDate: Date,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

1. **Registration**
   - User submits name, email, password
   - Password is hashed with bcrypt
   - User saved to database
   - JWT token generated and returned

2. **Login**
   - User submits email, password
   - Password verified against hash
   - JWT token generated and returned

3. **Protected Routes**
   - Token sent in Authorization header
   - Middleware verifies token
   - User ID extracted from token
   - Request proceeds if valid

---

## 🎨 Frontend Components

### Login Component
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Task List Component
```jsx
import { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      {filteredTasks.map(task => (
        <TaskItem key={task._id} task={task} onUpdate={loadTasks} />
      ))}
    </div>
  );
}
```

---

## 🔧 Backend Code Highlights

### User Model (models/User.js)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Auth Middleware (middleware/auth.js)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;
```

### Task Controller (controllers/taskController.js)
```javascript
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

---

## 📚 Learning Outcomes

### Frontend Skills
- ✅ React hooks (useState, useEffect)
- ✅ Component-based architecture
- ✅ React Router navigation
- ✅ State management
- ✅ API integration with Axios
- ✅ Form handling
- ✅ Protected routes

### Backend Skills
- ✅ RESTful API design
- ✅ Express.js routing
- ✅ MongoDB & Mongoose
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Middleware patterns
- ✅ Error handling

### Full-Stack Concepts
- ✅ Client-server communication
- ✅ Token-based authentication
- ✅ CORS configuration
- ✅ Environment variables
- ✅ API security
- ✅ Database modeling

---

## 🎯 Enhancement Ideas

1. **Task Categories** - Organize tasks by category
2. **Due Date Reminders** - Email/push notifications
3. **Team Collaboration** - Share tasks with others
4. **File Attachments** - Upload files to tasks
5. **Dark Mode** - Theme switching
6. **Task Priority** - Color-coded priorities
7. **Search & Filters** - Advanced filtering
8. **Analytics Dashboard** - Task statistics
9. **Drag & Drop** - Reorder tasks
10. **Export/Import** - CSV/JSON export

---

## 🧪 Testing

### Backend Testing
```bash
npm test
```

### Frontend Testing
```bash
npm test
```

### Test Examples
```javascript
describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task' });
    
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });
});
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh
```

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### Token Expiration
- Default: 7 days
- Update in auth controller

---

## 📄 License

MIT License - Free to use and modify!

---

## 🤝 Contributing

This is a sample project for ProjectHive. Feel free to:
- Fork and enhance
- Add new features
- Report issues
- Use as learning material

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net)

---

**Happy Full-Stack Development! 🚀**
