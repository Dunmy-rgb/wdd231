// scripts/spotlight.js

document.addEventListener('DOMContentLoaded', () => {
  fetch('json/member.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('spotlight-container');

      // Filter Gold and Silver members only
      const eligibleMembers = data.members.filter(
        member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
      );

      // Randomly select up to 3 unique members
      const selected = [];
      const copy = [...eligibleMembers];

      while (selected.length < 6 && copy.length > 0) {
        const index = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(index, 1)[0]);
      }

      // Create cards
      selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';

        card.innerHTML = `
          <img src="${member.image}" alt="${member.name} Logo" loading="lazy" />
          <h3>${member.name}</h3>
          <p>${member.tagline}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
          <p class="membership-level">${member.membershipLevel} Member</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load spotlight data:', err));
});
