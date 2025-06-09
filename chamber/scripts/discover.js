document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');
  const visitMessage = document.getElementById('visit-message');
  const lastModifiedEl = document.getElementById('lastModified');
  const STORAGE_KEY = 'discoverLastVisit';

  // Show last modified date
  if (lastModifiedEl) {
    lastModifiedEl.textContent = document.lastModified;
  }

  // Display visit message based on last visit
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

  // Load and display business/discovery cards from JSON
  async function loadCards() {
    try {
      const response = await fetch('json/discover.json');
      const data = await response.json();

      data.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            <figcaption>${item.title}</figcaption>
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
        `;

        cardsContainer.appendChild(card);
      });
    } catch (err) {
      cardsContainer.innerHTML = '<p class="error">Failed to load cards. Please try again later.</p>';
      console.error('Error loading discover.json:', err);
    }
  }

  // Init
  showVisitMessage();
  loadCards();
});
