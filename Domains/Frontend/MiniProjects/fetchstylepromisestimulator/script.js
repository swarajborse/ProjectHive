let successCount = 0;
let failCount = 0;
function fakeFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const resultDiv = document.getElementById("result");
    const resultTitle = document.getElementById("resultTitle");
    const resultContent = document.getElementById("resultContent");

    resultDiv.className = "result-container loading show";
    resultTitle.textContent = "⏳ Loading...";
    resultContent.innerHTML =
      '<div class="loader"></div><p style="text-align:center; margin-top:10px;">Simulating 2 second delay...</p>';

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;

      if (shouldFail) {
        reject({
          error: true,
          message: "Network Error: Failed to fetch",
          code: 500,
          timestamp: new Date().toISOString(),
        });
      } else {
        const users = ["Jane", "John", "Alice", "Bob", "Charlie", "Emma"];
        const randomUser = users[Math.floor(Math.random() * users.length)];

        resolve({
          success: true,
          user: randomUser,
          userId: Math.floor(Math.random() * 1000) + 1,
          timestamp: new Date().toISOString(),
          method: options.method || "GET",
          endpoint: url,
        });
      }
    }, 2000);
  });
}

document.getElementById("fetchBtn").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  const method = document.getElementById("method").value;
  const fetchBtn = document.getElementById("fetchBtn");
  const resultDiv = document.getElementById("result");
  const resultTitle = document.getElementById("resultTitle");
  const resultContent = document.getElementById("resultContent");

  if (!url.trim()) {
    alert("Please enter a URL!");
    return;
  }

  fetchBtn.disabled = true;
  fetchBtn.textContent = "Loading...";

  try {
    const data = await fakeFetch(url, { method });

    successCount++;
    document.getElementById("successCount").textContent = successCount;

    resultDiv.className = "result-container success show";
    resultTitle.textContent = "✅ Success!";
    resultContent.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    failCount++;
    document.getElementById("failCount").textContent = failCount;

    resultDiv.className = "result-container error show";
    resultTitle.textContent = "❌ Request Failed";
    resultContent.textContent = JSON.stringify(error, null, 2);
  } finally {
    fetchBtn.disabled = false;
    fetchBtn.textContent = "Make Request";
  }
});

function makeFetchWithThenCatch() {
  const url = document.getElementById("url").value;
  const method = document.getElementById("method").value;

  fakeFetch(url, { method })
    .then((data) => {
      console.log("Success with .then():", data);
    })
    .catch((error) => {
      console.error("Error with .catch():", error);
    });
}
