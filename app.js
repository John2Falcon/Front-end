/* app.js */
document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("newsList");
    const searchNews = document.getElementById("searchNews");
    const feedUrl = document.getElementById("feedUrl");
    const addFeed = document.getElementById("addFeed");

    function fetchNews(query = "") {
        let url = "http://localhost/api.php?news";
        if (query) {
            url = `http://localhost/api.php?searchNews&q=${query}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                newsList.innerHTML = "";
                data.news.forEach(news => {
                    const newsCard = document.createElement("div");
                    newsCard.classList.add("col-md-4");
                    newsCard.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.description}</p>
                                <a href="${news.link}" class="btn btn-primary" target="_blank">Leer más</a>
                            </div>
                        </div>
                    `;
                    newsList.appendChild(newsCard);
                });
            });
    }

    searchNews.addEventListener("input", () => {
        fetchNews(searchNews.value);
    });

    addFeed.addEventListener("click", () => {
        fetch("http://localhost/api.php?feeds", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: feedUrl.value })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            feedUrl.value = "";
        });
    });

    fetchNews();
});
