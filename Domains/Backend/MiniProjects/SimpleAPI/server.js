const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ==================== Middleware ====================

// Parse JSON bodies
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// ==================== Data Store ====================

// In-memory data store (replace with database in production)
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Classic"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Classic"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian"
    }
];

// ==================== Routes ====================

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Simple Books API',
        version: '1.0.0',
        endpoints: {
            getAllBooks: 'GET /api/books',
            getBook: 'GET /api/books/:id',
            createBook: 'POST /api/books',
            updateBook: 'PUT /api/books/:id',
            deleteBook: 'DELETE /api/books/:id'
        }
    });
});

// GET all books
app.get('/api/books', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// GET single book by ID
app.get('/api/books/:id', (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Book not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// POST create new book
app.post('/api/books', (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        
        // Validation
        if (!title || !author || !year) {
            return res.status(400).json({
                success: false,
                error: 'Please provide title, author, and year'
            });
        }
        
        // Create new book
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title,
            author,
            year: parseInt(year),
            genre: genre || 'Uncategorized'
        };
        
        books.push(newBook);
        
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// PUT update book
app.put('/api/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Book not found'
            });
        }
        
        const { title, author, year, genre } = req.body;
        
        // Update book
        books[bookIndex] = {
            ...books[bookIndex],
            title: title || books[bookIndex].title,
            author: author || books[bookIndex].author,
            year: year ? parseInt(year) : books[bookIndex].year,
            genre: genre || books[bookIndex].genre
        };
        
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: books[bookIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// DELETE book
app.delete('/api/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Book not found'
            });
        }
        
        const deletedBook = books[bookIndex];
        books.splice(bookIndex, 1);
        
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// ==================== Error Handling ====================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// ==================== Start Server ====================

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   📚 Simple Books API Server          ║
    ║                                        ║
    ║   🚀 Server is running!               ║
    ║   📡 Port: ${PORT}                        ║
    ║   🌐 URL: http://localhost:${PORT}        ║
    ║                                        ║
    ║   📖 API Docs: http://localhost:${PORT}/  ║
    ╚════════════════════════════════════════╝
    `);
});

// Export for testing
module.exports = app;
