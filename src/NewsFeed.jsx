import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  { name: "Business", icon: "📈" },
  { name: "Entertainment", icon: "🌟" },
  { name: "General", icon: "🕒" },
  { name: "Health", icon: "❤️" },
  { name: "Science", icon: "🔬" },
  { name: "Sports", icon: "🏀" },
  { name: "Technology", icon: "⚡" },
];



function NewsFeed() {

  const [selected, setSelected] = useState("Technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async (category) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${category.toLowerCase()}&from=2025-04-12&sortBy=publishedAt&apiKey=d312f8251f2a45d587c91f81f97545d7`
      );
      setArticles(res.data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    fetchArticles(searchTerm);
  };

  useEffect(() => {
    fetchArticles(selected);
  }, [selected]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f9fbfd] text-gray-800">
      {/* Header */}
      <header className="flex justify-between flex-col md:flex-row items-center w-full px-10 py-4 bg-white shadow   md:px-4">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4 md:mb-0">NewsPulse</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search news..."
            className="rounded-full px-4 py-2 border outline-none w-full md:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-3 py-2 border bg-white border-gray-400 text-white rounded-full hidden md:block"
          >
            🔍
          </button>
        </div>
        <button
          className="text-blue-600 md:mr-6 hover:underline bg-white border rounded-full border-gray-400 mt-4 md:mt-0 md:ml-4"
          onClick={() => fetchArticles(selected)}
        >
          🔄 Refresh
        </button>
      </header>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 py-6">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelected(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
              selected === cat.name
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Articles Section */}
      <main className="flex-1 px-6 pb-10">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-4 inline-block"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-8 rounded-2xl shadow-md mt-20">
            <h2 className="text-xl font-semibold mb-2">No news articles found</h2>
            <p className="mb-4 text-sm text-gray-500">Try a different category</p>
            <button
              onClick={() => setSelected("Technology")}
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Reset to Technology
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t mt-auto">
        <div>© 2025 NewsPulse - Real-time news feed</div>
        <div className="flex justify-center items-center gap-3 mt-2"></div>
      </footer>
    </div>
  );
}

export default NewsFeed;
