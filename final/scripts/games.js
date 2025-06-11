const gameGrid = document.getElementById("game-list"); // correct ID
const modal = document.getElementById("game-modal");
const modalBody = document.getElementById("modal-details"); // updated to match HTML
const closeModal = document.getElementById("close-modal");
const genreFilter = document.getElementById("genre");

// ========== Responsive Navigation ==========
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.innerHTML = nav.classList.contains("open") ? "✖" : "☰";
});

let allGames = [];

async function loadGames() {
  try {
    const res = await fetch("./data/games.json");
    const games = await res.json();
    allGames = games;
    renderGames(allGames);
  } catch (err) {
    gameGrid.innerHTML = `<p>Unable to load games.</p>`;
    console.error("Error loading games:", err);
  }
}

function renderGames(games) {
  gameGrid.innerHTML = ""; // clear existing
  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}" />
      <h3>${game.name}</h3>
      <button data-id="${game.id}">More Info</button>
    `;
    gameGrid.appendChild(card);
  });

  document.querySelectorAll("#game-list button").forEach(btn => {
    btn.addEventListener("click", () => {
      const gameId = btn.dataset.id;
      const selected = allGames.find(g => g.id == gameId);
      showModal(selected);
    });
  });
}

function showModal(game) {
  modalBody.innerHTML = `
    <h3>${game.name}</h3>
    <img src="${game.image}" alt="${game.name}" />
    <p><strong>Genre:</strong> ${game.genre}</p>
    <p><strong>Platform:</strong> ${game.platform}</p>
    <p>${game.description}</p>
  `;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// 🔥 Add filter logic
genreFilter.addEventListener("change", () => {
  const selectedGenre = genreFilter.value.toLowerCase();
  if (selectedGenre === "all") {
    renderGames(allGames);
  } else {
    const filtered = allGames.filter(game =>
      game.genre.toLowerCase().includes(selectedGenre)
    );
    renderGames(filtered);
  }
});

loadGames();
