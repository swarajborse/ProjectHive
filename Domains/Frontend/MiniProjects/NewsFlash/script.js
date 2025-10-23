const apiKey = "84071566e88444519789a937d0240f6d"; // Replace this with your NewsAPI key
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");

let page = 1;
let category = "general";
let query = "";
let loading = false;

async function fetchNews() {
  if (loading) return;
  loading = true;
  loader.classList.remove("hidden");

  let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&page=${page}&apiKey=${apiKey}`;
  if (category !== "general") url += `&category=${category}`;
  if (query) url = `https://newsapi.org/v2/everything?q=${query}&pageSize=9&page=${page}&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok" || !data.articles.length) {
      if (page === 1) {
        newsContainer.innerHTML = `<p style="text-align:center;color:#ddd;">No news found 📰</p>`;
      }
      loader.classList.add("hidden");
      loading = false;
      return;
    }

    displayNews(data.articles);
  } catch (err) {
    console.error("Error fetching news:", err);
    newsContainer.innerHTML = `<p style="color:red;text-align:center;">Error loading news. Check API key or network.</p>`;
  }

  loader.classList.add("hidden");
  loading = false;
}

function displayNews(articles) {
  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="news image">
      <div class="news-card-content">
        <h3>${article.title || "Untitled"}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More →</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

// Category buttons
document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    category = btn.dataset.category;
    query = "";
    page = 1;
    newsContainer.innerHTML = "";
    fetchNews();
  });
});

// Search
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    query = searchInput.value.trim();
    category = "general";
    page = 1;
    newsContainer.innerHTML = "";
    fetchNews();
  }
});

// Infinite Scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    page++;
    fetchNews();
  }
});

// First Load
fetchNews();
