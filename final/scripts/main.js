// ========== Responsive Navigation ==========
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.innerHTML = nav.classList.contains("open") ? "✖" : "☰";
});

// ========== Set Active Link ==========
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ========== Featured Game (index.html) ==========
async function loadFeaturedGame() {
  const section = document.getElementById("featured-game");
  if (!section) return;

  try {
    const res = await fetch("data/games.json");
    const games = await res.json();
    const featured = games.find(game => game.featured);

    if (featured) {
      section.innerHTML = `
        <div class="card">
          <h3>${featured.name}</h3>
          <img src="${featured.image}" alt="${featured.name}" width="300" height="200">
          <p>${featured.description}</p>
        </div>
      `;
    }
  } catch (err) {
    section.innerHTML = `<p>Failed to load featured game.</p>`;
    console.error("Error loading featured game:", err);
  }
}

loadFeaturedGame();
