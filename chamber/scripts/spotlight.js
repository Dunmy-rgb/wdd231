document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('spotlight-container');
  fetch('json/member.json')
    .then(response => response.json())
    .then(data => {
      const eligibleMembers = data.members.filter(
        member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
      );

      const selected = [];
      const copy = [...eligibleMembers];
      while (selected.length < 3 && copy.length > 0) {
        const index = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(index, 1)[0]);
      }

      container.innerHTML = '';

      selected.forEach(member => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';
        card.setAttribute('role', 'region');
        card.setAttribute('aria-label', `Spotlight member ${member.name}`);

        card.innerHTML = `
          <img src="${member.image}" alt="Photo of ${member.name}" loading="lazy" width="120" height="120"/>
          <h3>${member.name}</h3>
          <p>${member.tagline}</p>
          <address>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
          </address>
          <p><a href="${member.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit website of ${member.name}">Visit Website</a></p>
          <p class="membership-level">${member.membershipLevel} Member</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Failed to load spotlight data:', err);
      container.innerHTML = '<p role="alert">Sorry, we are unable to load spotlight members at this time.</p>';
    });
});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.setAttribute('aria-expanded', 'false');
hamburger.addEventListener("click", () => {
  const expanded = navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
  hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});
