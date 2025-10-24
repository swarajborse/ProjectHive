# 🍕 Pizzeria Restaurant Website

**Contributor:** snehal492006  
**Domain:** Frontend / E-commerce (Restaurant)  
**Difficulty:** Beginner  
**Tech Stack:** HTML, CSS, Bootstrap 5, Boxicons, Bootstrap Icons  

---

## 📝 Description
This is a responsive, multi-page **Pizzeria Restaurant Website** built for a fictional restaurant brand.  
The project focuses on creating a modern, visually appealing, and functional frontend using **Bootstrap 5** for layout and responsiveness.  
It features a **homepage with a product showcase**, a **dedicated offers page**, and a **contact form section**.

---

## 🎯 Features

✅ **Responsive Design** – Uses Bootstrap's grid system and media queries to ensure full functionality across mobile, tablet, and desktop screens.  
✅ **Interactive Navigation Bar** – Fixed-top navbar with icons and links (Home, Cart, Offers, Contact Us). Collapses into a hamburger menu on smaller screens.  
✅ **Image Carousel** – Responsive carousel on the homepage showcasing popular pizzas and offers.  
✅ **Product Showcase (Offers)** – Displays a grid of “Popular Pizzas” using Bootstrap cards with images, titles, descriptions, price (₹200), and “Order Now” buttons.  
✅ **Dedicated Order Page** – `order.html` showcases the same pizzas as a full menu page.  
✅ **Contact Form** – Integrated form for user inquiries, available on both homepage and `contact.html`.  
✅ **Custom Styling** – Includes rounded card images, styled buttons, and a dark theme using custom CSS.

---

## 🛠️ Tech Stack

| Technology | Role |
|-------------|------|
| **HTML5** | Provides the structure for all pages (`index.html`, `order.html`, `contact.html`). |
| **CSS** | Custom styling for cards, buttons, and layout design. |
| **Bootstrap 5** | Framework for responsiveness, navigation, carousel, and components. |
| **Boxicons** | Icons used in the navigation bar. |
| **Bootstrap Icons** | Icons for contact details (location, phone, email, website). |

---

## 🚀 How to Run

This is a **purely front-end project**, no backend setup required.

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/snehal492006/pizzeria-website.git
   cd pizzeria-website
2. **Open in Browser:**
Simply open the INDEX.html file in any browser.
Note: The Log In button redirects to FORM.html.

3. **Explore the Features:**
Navigate between Home, Products, Blogs, Reviews, and Contact sections using the header navigation bar.

## 📁Project Structure

Copy code
PizzeriaWebsite/
├── index.html      # Homepage with navbar, carousel, products, and contact form
├── order.html      # Dedicated offers/menu page
├── contact.html    # Contact page with form and details
├── style.css       # Custom CSS for styling and media queries
├── images/         # Product and carousel images
└── README.md       # Project documentation

## 💻 Code Highlights (CSS)

**🎨 Custom Card and Button Styling**


.card-img-top {
  border-radius: 50px; /* Rounded pizza images */
  padding: 20px;
}
.card {
  border-radius: 30px;
  height: auto;
}
.card-title {
  color: #ffc107; /* Highlight pizza titles in yellow */
}
.btn-primary {
  border-radius: 50px; /* Pill-shaped buttons */
  width: 120px;
}
.btn-primary:hover {
  background-color: black; /* Custom hover effect */
}

## 📱 Mobile Responsiveness

@media (max-width: 768px) {
  h1 {
    color: #fff;
    margin-left: 100px; /* Center heading for mobile */
  }
  /* Additional responsive adjustments */
}

## 🚀 Future Enhancements
🛒 JavaScript Interactivity: Add a working shopping cart and dynamic “Order Now” feature.

✅ Input Validation: Include form validation for the contact page.

🎨 Sass/Less Integration: Refactor CSS with pre-processors for modular and reusable design.

## 🧠 Author

Snehal Baramade
✨ Frontend Developer | 🎨 Creative Designer | 💻 Tech Enthusiast

🍕 Made with ❤️ by snehal492006 for learning and creative exploration!