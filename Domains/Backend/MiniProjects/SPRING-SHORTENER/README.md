# 🌐 URL Shortener — Spring Boot MVP 🚀

- A lightweight URL shortener built with Spring Boot and a minimal HTML/CSS/JS frontend.
- This MVP covers the core flow: enter a long URL → get a short one → copy or share instantly.

## ✨ Features (MVP)

- 🔗 Shorten long URLs via a Spring Boot REST API

- 📦 Store URL mappings in MongoDB

- 💡 Clean, centered UI with smooth fade transitions

- 📋 Copy short URL to clipboard

- 💬 Share short URL via WhatsApp

- 💻 Simple structure, ready for scaling

## 🧠 Tech Stack

- Backend: Spring Boot (Java), MongoDB
- Frontend: HTML, CSS, JavaScript
- Database: MongoDB (local or Atlas connection)

## ⚙️ Getting Started

### Clone the repository
```
git clone https://github.com/shwetharbaliga/URL-SHORTENER.git
cd URL-SHORTENER
```

### 🖥 Run the backend

- Ensure MongoDB is running locally (mongodb://localhost:27017/urlshortener)

- Or configure your Atlas URI in application.properties

### Start the Spring Boot app:

```
./mvnw spring-boot:run
```

or in IntelliJ / VS Code — run the main class.

### 🌍 Run the frontend

- Open index.html in your browser

- Paste a long URL and click Generate ShortCode

- Copy or share the generated link 🎉

📂 Project Structure
```
URL-SHORTENER/
│
├── src/main/java/com/example/urlshortener/
│   ├── controller/UrlController.java
│   ├── model/Url.java
│   ├── repository/UrlRepository.java
│   ├── service/UrlService.java
│   └── UrlShortenerApplication.java
│
├── src/main/resources/
│   ├── application.properties
│   └── static/
│       ├── index.html
│       ├── styles.css
│       └── assets/
│           ├── copy.svg
│           └── share-fat.svg
```

### 🚧 Work in Progress

- Add URL validation

- Handle duplicates / expired links

- Improve UI layout alignment

- Deploy frontend + backend together

### 🌱 Next Steps

- Add analytics (click count, usage stats)

- Introduce Redis caching

- Enable rate limiting

- Containerize with Docker

### 🧡 Credits

- Built by Shweta Ravindra Baliga

- Inspired by Karan Pratap Singh’s System Design Series and adapted into a Spring Boot version with custom frontend touches.
