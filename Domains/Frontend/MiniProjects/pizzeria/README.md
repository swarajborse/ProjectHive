🍕 Pizzeria Restaurant Website

Contributor: snehal492006 
Domain: Frontend / E-commerce (Restaurant)
Difficulty: Beginner
Tech Stack: HTML, CSS, Bootstrap 5, Boxicons, Bootstrap Icons

📝 Description
This is a responsive, multi-page website for a fictional Pizzeria restaurant. The project focuses on creating a modern, visually appealing, and functional frontend using Bootstrap 5 for layout and responsiveness. It features a homepage with a product showcase, a dedicated offers page, and a contact form section.

🎯 Features
✅ Responsive Design: Utilizes Bootstrap's grid system and media queries to ensure the site is fully functional and visually consistent across mobile, tablet, and desktop screens.
✅ Interactive Navigation Bar: A fixed-top navigation bar with icons and links to Home, Cart, Offers, and Contact Us. The navigation also collapses into a hamburger menu on small screens.
✅ Image Carousel: Features a responsive carousel on the homepage to showcase special promotions and popular items.
✅ Product Showcase (Offers): Displays a grid of "Popular Pizza's" using Bootstrap cards with images, titles, descriptions, price (200 RS), and an "Order Now" button.
✅ Dedicated Order Page: A separate order.html page showcases the same popular pizzas, acting as a direct menu/offer page.
✅ Contact Form: Includes an integrated contact section on the homepage and a dedicated contact.html with a user input form and business contact details.
✅ Custom Styling: Uses custom CSS for unique elements like rounded card images, styled buttons, and dark background themes.

🛠️ Tech Stack
| Technology | Role |
| :--- | :--- |
| HTML5 | Provides the structure for all web pages (index.html, order.html, contact.html). |
| CSS | Custom styling, particularly for card elements, background, and typography. |
| Bootstrap 5 | Primary framework for layout, responsiveness, navigation, carousel, and card components. |
| Boxicons | Used for icons in the navigation bar (Home, Cart, Offers, Contact). |
| Bootstrap Icons | Used for icons in the contact information section (location, phone, email, website). |

🚀 How to Run
This is a purely front-end project and does not require a backend server.
Installation Steps
1.	Clone the repository: (Assuming this is hosted on a platform like GitHub)
Bash
git clone <repository-url>
cd pizzeria-website
2.	Open in Browser: Open the index.html file in any modern web browser.
3.	Navigate: Use the navigation bar to visit the Offers (order.html) and Contact Us (contact.html) pages.

📁 Project Structure
PizzeriaWebsite/
├── index.html        # Main Homepage (Includes Navbar, Carousel, Popular Pizzas, and Contact Form)
├── order.html        # Dedicated menu/Order page.
├── contact.html      # Dedicated Contact Form page with full contact details.
├── style.css         # Custom styles for layout, components, and media queries.
├── images/            # Directory for product images (e.g., greek.jpg, sicilian.jpg) and carousel slides.
└── README.md           # Project documentation (This file)

💻 Code Highlights (CSS)
Custom Card and Button Styling
The project uses custom CSS to override Bootstrap defaults for a polished look:
CSS
.card-img-top{
    border-radius: 50px; /* Highly rounded image corners */
    padding: 20px;
}
.card{
    border-radius: 30px;
    height: auto;
}
.card-title{
    color: #ffc107; /* Highlight pizza titles in yellow */
}
.btn-primary{
    border-radius: 50px; /* Pill-shaped buttons */
    width: 120px;
}
.btn-primary:hover{
    background-color: black; /* Custom hover effect */
}
Mobile Responsiveness
Media queries are used to adjust the main heading position for smaller screens:
CSS
@media (max-width: 768px)
{
    h1{
        color: #fff;
        margin-left: 100px; /* Center-aligns or moves the main heading for mobile */
    }
    /* ... other responsive adjustments ... */
}

🚀 Future Enhancements
•	JavaScript Interactivity: Implement a functional shopping cart and handle "Order Now" button clicks with actual product data (requires JavaScript).
•	Input Validation: Add client-side validation for the contact form fields.
•	Sass/Less: Refactor CSS using a pre-processor for better variable management and modularity.

🧠 Author
Snehal Baramade
✨ Frontend Developer | Creative Designer | Tech Enthusiast
