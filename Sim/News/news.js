document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('news-container');
    const apiKey = '674be0ed2a90408882e150f8bc62f873'; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/everything?q=environment&apiKey=${apiKey}`;

    // Function to fetch and render news articles
    async function fetchNews() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const newsArticles = data.articles;

            // Clear existing news
            newsContainer.innerHTML = '';

            newsArticles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';

                newsItem.innerHTML = `
                    <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}">
                    <div class="news-item-content">
                        <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                        <p>${article.description || 'No description available.'}</p>
                        <p><small>Published at: ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
                    </div>
                `;

                newsContainer.appendChild(newsItem);
            });
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        }
    }

    // Fetch news on page load
    fetchNews();
});
