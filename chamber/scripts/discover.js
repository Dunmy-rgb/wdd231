// Last modified date
document.getElementById("lastModified").textContent = document.lastModified;

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');
  const visitMessage = document.getElementById('visit-message');
  const STORAGE_KEY = 'discoverLastVisit';

  // Show last visit message
  function showVisitMessage() {
    const now = Date.now();
    const lastVisit = localStorage.getItem(STORAGE_KEY);

    if (!lastVisit) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - parseInt(lastVisit, 10);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        visitMessage.textContent = "Back so soon! Awesome!";
      } else {
        visitMessage.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
      }
    }

    localStorage.setItem(STORAGE_KEY, now.toString());
  }

  // Fetch JSON data and build cards
  async function loadCards() {
    try {
      const response = await fetch('json/discover.json');
      const data = await response.json();

      data.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </figure>
          <div class="card-content">
            <h2>${item.title}</h2>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
          </div>
        `;

        cardsContainer.appendChild(card);
      });
    } catch (err) {
      cardsContainer.textContent = 'Failed to load items.';
      console.error(err);
    }
  }

  showVisitMessage();
  loadCards();
});
