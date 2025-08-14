const contentList = document.getElementById("content-list");
const loader = document.getElementById("loader");

let loading = false;
let page = 1;
const itemsPerPage = 10;
let totalItems = 0;

const fetchData = (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      const start = (page - 1) * limit;
      const end = start + limit;

      const themes = [
        {
          category: "Nature",
          color: "#4CAF50",
          tags: ["outdoor", "wildlife", "landscape"],
        },
        {
          category: "Technology",
          color: "#2196F3",
          tags: ["innovation", "digital", "modern"],
        },
        {
          category: "Travel",
          color: "#FF9800",
          tags: ["adventure", "culture", "exploration"],
        },
        {
          category: "Food",
          color: "#E91E63",
          tags: ["cuisine", "recipe", "delicious"],
        },
        {
          category: "Art",
          color: "#9C27B0",
          tags: ["creative", "design", "inspiration"],
        },
        {
          category: "Science",
          color: "#607D8B",
          tags: ["research", "discovery", "knowledge"],
        },
      ];

      for (let i = start; i < end; i++) {
        const theme = themes[i % themes.length];
        const cardNumber = i + 1;

        data.push({
          id: cardNumber,
          title: `${theme.category} Discovery`,
          description: `Explore the fascinating world of ${theme.category.toLowerCase()}. This amazing content will take you on a journey through incredible discoveries and insights that will expand your knowledge and inspire your curiosity.`,
          image: `https://picsum.photos/400/300?random=${cardNumber}`,
          category: theme.category,
          tags: theme.tags,
          color: theme.color,
        });
      }
      resolve(data);
    }, 1000);
  });
};

const addItemsToDOM = (items) => {
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${
      item.title
    }" class="card-image" loading="lazy">
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-description">${item.description}</p>
        <div class="card-tags">
          ${item.tags
            .map((tag) => `<span class="card-tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
    `;

    contentList.appendChild(card);
  });
  totalItems += items.length;
};

const loadMoreContent = async () => {
  if (loading) return;
  loading = true;
  loader.style.display = "block";

  try {
    const newItems = await fetchData(page, itemsPerPage);
    addItemsToDOM(newItems);
    page++;
  } catch (error) {
    console.error("Failed to load more content:", error);
  } finally {
    loading = false;
    loader.style.display = "none";
  }
};

loadMoreContent();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    loadMoreContent();
  }
});
