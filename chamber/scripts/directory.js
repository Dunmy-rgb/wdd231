
// Last modified date
document.getElementById("lastModified").textContent = document.lastModified;

const directoryContainer = document.getElementById("directory");

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

async function getMembers() {
  try {
    const response = await fetch("json/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  directoryContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("directory-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membershipLevel} Member</strong></p>
    `;

    directoryContainer.appendChild(card);
  });
}

const businesses = [
  
];

const directory = document.getElementById("directory");

function displayBusinesses(data) {
  directory.innerHTML = "";
  data.forEach(biz => {
    const card = document.createElement("div");
    card.classList.add("directory-card");

    card.innerHTML = `
      <img src="${biz.image}" alt="${biz.name} logo">
      <div>
        <h4>${biz.name}</h4>
        <p>${biz.tagline}</p>
        <p><strong>Email:</strong> ${biz.email}<br>
        <strong>Phone:</strong> ${biz.phone}<br>
        <strong>URL:</strong> <a href="https://${biz.url}" target="_blank">${biz.url}</a></p>
      </div>
    `;
    directory.appendChild(card);
  });
}

displayBusinesses(businesses);

document.getElementById("gridView").addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});

document.getElementById("listView").addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});


getMembers();
