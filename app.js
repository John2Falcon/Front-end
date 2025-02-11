/* app.js */
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/api.php?news")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const container = document.getElementById("news-container");
                data.news.forEach(newsItem => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${newsItem.title}</strong><br>${newsItem.description}`;
                    container.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Error cargando las noticias:", error));
});
