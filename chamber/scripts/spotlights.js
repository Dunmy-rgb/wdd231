fetch('json/member.json')
  .then(res => res.json())
  .then(data => {
    const spotlightContainer = document.getElementById('spotlight-container');
    const goldSilver = data.members.filter(m =>
      m.membership === 'Gold' || m.membership === 'Silver'
    );

    const selected = [];
    while (selected.length < 3 && goldSilver.length > 0) {
      const index = Math.floor(Math.random() * goldSilver.length);
      selected.push(goldSilver.splice(index, 1)[0]);
    }

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="${member.logo}" alt="${member.name} Logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="level">${member.membership} Member</p>
      `;
      spotlightContainer.appendChild(card);
    });
  });
