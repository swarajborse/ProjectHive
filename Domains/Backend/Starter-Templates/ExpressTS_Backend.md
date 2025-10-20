# Express.js + TypeScript + MongoDB Starter Template

**Contributor:** Tejas-Santosh-Nalawade
**Domain:** Backend
**Last Updated:** October 2024

## 📦 What's Included

A production-ready Node.js backend starter template with Express.js, TypeScript, and MongoDB. This template includes authentication, validation, error handling, logging, and testing setup - everything you need to build a robust REST API.

### ✨ Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 🔷 **TypeScript** - Type-safe development
- 🗄️ **MongoDB** - NoSQL database with Mongoose ODM
- 🔐 **JWT Authentication** - Secure token-based auth
- ✅ **Validation** - Request validation with Joi/express-validator
- 🛡️ **Security** - Helmet, rate limiting, CORS
- 📝 **Logging** - Winston logger with different levels
- 🧪 **Testing** - Jest and Supertest setup
- 📄 **API Documentation** - Swagger/OpenAPI
- 🔄 **Hot Reload** - Nodemon for development
- 🌍 **Environment Config** - dotenv configuration
- 📊 **Error Handling** - Centralized error handling
- 🎯 **Code Quality** - ESLint and Prettier
- 📁 **MVC Architecture** - Organized folder structure

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn or pnpm

### Installation

1. **Clone the template**
   ```bash
   git clone https://github.com/yourusername/express-ts-mongodb-template.git my-api
   cd my-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/myapp
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_EXPIRE=30d
   
   # Security
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX=100
   
   # Email (Optional - for password reset)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_email_password
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   - API Base URL: `http://localhost:5000/api/v1`
   - API Documentation: `http://localhost:5000/api-docs`

## 📁 Project Structure

```
express-ts-mongodb/
├── src/
│   ├── config/                   # Configuration files
│   │   ├── database.ts          # MongoDB connection
│   │   ├── logger.ts            # Winston logger setup
│   │   └── swagger.ts           # Swagger configuration
│   ├── controllers/              # Route controllers
│   │   ├── auth.controller.ts   # Authentication logic
│   │   ├── user.controller.ts   # User CRUD operations
│   │   └── post.controller.ts   # Example resource
│   ├── middleware/               # Custom middleware
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── error.middleware.ts  # Error handling
│   │   ├── validate.middleware.ts # Input validation
│   │   ├── rateLimiter.ts      # Rate limiting
│   │   └── upload.middleware.ts # File upload (multer)
│   ├── models/                   # Mongoose models
│   │   ├── User.model.ts        # User schema
│   │   ├── Post.model.ts        # Post schema
│   │   └── Token.model.ts       # Refresh token schema
│   ├── routes/                   # API routes
│   │   ├── index.ts             # Route aggregator
│   │   ├── auth.routes.ts       # Auth endpoints
│   │   ├── user.routes.ts       # User endpoints
│   │   └── post.routes.ts       # Post endpoints
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts      # Auth operations
│   │   ├── user.service.ts      # User operations
│   │   ├── email.service.ts     # Email sending
│   │   └── token.service.ts     # Token generation
│   ├── types/                    # TypeScript types
│   │   ├── express.d.ts         # Express extensions
│   │   ├── user.types.ts        # User types
│   │   └── api.types.ts         # API response types
│   ├── utils/                    # Utility functions
│   │   ├── ApiError.ts          # Custom error class
│   │   ├── ApiResponse.ts       # Response formatter
│   │   ├── asyncHandler.ts      # Async error handler
│   │   ├── validators.ts        # Validation schemas
│   │   └── helpers.ts           # Helper functions
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── tests/                        # Test files
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       ├── auth.test.ts
│       └── user.test.ts
├── uploads/                      # File uploads directory
├── logs/                         # Application logs
│   ├── error.log
│   └── combined.log
├── .env.example                  # Environment template
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── .gitignore
├── jest.config.js               # Jest configuration
├── nodemon.json                 # Nodemon configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## ⚙️ Configuration Files

### TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@config/*": ["config/*"],
      "@controllers/*": ["controllers/*"],
      "@models/*": ["models/*"],
      "@routes/*": ["routes/*"],
      "@middleware/*": ["middleware/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### ESLint Configuration

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es6: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript to JavaScript
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report

# Database
npm run seed             # Seed database with sample data
npm run db:reset         # Reset database
```

## 🔐 Authentication Flow

### User Registration
```typescript
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

### User Login
```typescript
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Protected Routes
```typescript
GET /api/v1/users/profile
Authorization: Bearer <access_token>
```

## 🧩 Code Examples

### Model Example (User Model)

```typescript
// src/models/User.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

### Controller Example

```typescript
// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import User from '@/models/User.model';
import { ApiError } from '@/utils/ApiError';
import { ApiResponse } from '@/utils/ApiResponse';
import { asyncHandler } from '@/utils/asyncHandler';

export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id).select('-password');
    
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json(
      new ApiResponse(200, user, 'Profile fetched successfully')
    );
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json(
      new ApiResponse(200, user, 'Profile updated successfully')
    );
  }
);
```

### Middleware Example (Auth)

```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '@/utils/ApiError';
import { asyncHandler } from '@/utils/asyncHandler';
import User from '@/models/User.model';

interface JwtPayload {
  id: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new ApiError(401, 'Not authorized to access this route')
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return next(new ApiError(401, 'User no longer exists'));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(new ApiError(401, 'Invalid token'));
    }
  }
);

// Authorize based on roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(403, 'User role not authorized to access this route')
      );
    }
    next();
  };
};
```

### Validation Example

```typescript
// src/utils/validators.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ],
  "stack": "Error stack (only in development)"
}
```

## 🧪 Testing

### Unit Test Example
```typescript
// tests/unit/services/auth.service.test.ts
import { generateToken } from '@/services/token.service';

describe('Token Service', () => {
  it('should generate valid JWT token', () => {
    const userId = '123456';
    const token = generateToken(userId);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
```

### Integration Test Example
```typescript
// tests/integration/auth.test.ts
import request from 'supertest';
import app from '@/app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('tokens');
  });
});
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy with Docker
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

## 🔒 Security Best Practices

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Rate limiting to prevent abuse
- ✅ Helmet for security headers
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection
- ✅ SQL/NoSQL injection prevention
- ✅ XSS protection

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - free for any use!

---

**Happy Coding! 🚀**

*This is a sample starter template for ProjectHive. Customize according to your needs when contributing.*
