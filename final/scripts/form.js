// ========== Responsive Navigation ==========
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.innerHTML = nav.classList.contains("open") ? "✖" : "☰";
});

const form = document.querySelector("form");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    game: form.game.value,
    platform: form.platform.value,
    rating: form.rating.value,
    reason: form.desc.value,
    newsletter: form.newsletter.checked
  };

  localStorage.setItem("suggestionData", JSON.stringify(formData));
  window.location.href = "thankyou.html";
});

// ===== thankyou.html display =====
const output = document.getElementById("submission-output");
if (output) {
  const data = JSON.parse(localStorage.getItem("suggestionData"));
  if (data) {
    output.innerHTML = `
      <div class="card">
        <h2>Thank You, ${data.name}!</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Suggested Game:</strong> ${data.game}</p>
        <p><strong>Platform:</strong> ${data.platform}</p>
        <p><strong>Rating:</strong> ${"★".repeat(data.rating)}</p>
        <p><strong>Reason:</strong> ${data.reason}</p>
        <p><strong>Newsletter:</strong> ${data.newsletter ? "Yes" : "No"}</p>
      </div>
    `;
  }
}
