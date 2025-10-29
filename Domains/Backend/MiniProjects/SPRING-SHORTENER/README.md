# 🌐 SpringShortener — MVP 🚀

Contributor: shwetharbaliga

## 📝 Description

- A minimal URL shortener built using Spring Boot and MongoDB, with a lightweight HTML/CSS/JS frontend.
- It lets users shorten long URLs, get a short code instantly, and copy or share the generated link.

## ✨ Features

- Create short URLs via a Spring Boot REST API

- Redirect short URLs to the original destination

- Avoid duplicates (checks for existing URLs)

- Copy and share directly from the UI

- Smooth transitions and clean, minimal design

## 🧠 Tech Stack

- Backend: Spring Boot (Java)

- Frontend: HTML, CSS, JavaScript

- Database: MongoDB

## ⚙️ Setup
### Clone the repository
```
git clone <repository-url>
cd Domains/Backend/MiniProjects/SpringShortener
```

### Run the backend

Ensure MongoDB is running locally:
```
mongodb://localhost:27017/urlshortener
```

### Start the app:
```
./mvnw spring-boot:run
```

or run the UrlShortenerApplication.java file in your IDE.

### Run the frontend

- Open src/main/resources/static/index.html in your browser.
- Enter a long URL → click Generate ShortCode → Copy or Share 🎉

## 🔗 API Endpoints
### 🧩 Create Short URL

```
POST /api/urls/create
Content-Type: application/json

{
  "originalUrl": "https://example.com/some/long/url"
}


Response:

{
  "message": "New short code created",
  "shortcode": "abc123"
}
```

If the URL already exists:
```
{
  "message": "Short code already exists",
  "shortcode": "abc123"
}
```
### 🚀 Redirect to Original URL
```
GET /api/urls/r/{shortCode}
```
Redirects to the original long URL if found.
If not found → returns 404 “Short URL not found”.

## 🏠 Test Endpoint

GET /api/urls/ → returns a simple “Hello from SpringBoot + MongoDB!” message.

## ⚙️ How It Works

- User enters a long URL in the frontend.

- Backend checks if it already exists in MongoDB.

- If not, it generates a new short code and saves it.

- User gets a short code, which redirects to the original URL.

## 🧡 Credits

- Built by Shweta Ravindra Baliga
- Inspired by Karan Pratap Singh’s System Design Series and reimagined in Spring Boot with a custom frontend.
