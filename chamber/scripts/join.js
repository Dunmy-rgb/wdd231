document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
  const membershipInput = document.getElementById('membership-level');
  const modals = document.querySelectorAll('.membership-modal');
  const selectedLevelDisplay = document.getElementById('selected-level-display');
  // Open modal
  document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });
  // Close modal
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('dialog');
      modal.close();
    });
  });
  // Select membership level
  document.querySelectorAll('.select-level').forEach(button => {
    button.addEventListener('click', () => {
      const level = button.getAttribute('data-level');
      membershipInput.value = level;
      selectedLevelDisplay.textContent = `Selected Membership Level: ${level}`;
      modals.forEach(modal => modal.close());
    });
  });
  // Prevent submission without a membership level
  document.querySelector('form').addEventListener('submit', e => {
    if (!membershipInput.value) {
      e.preventDefault();
      alert('Please select a membership level before submitting.');
    }
  });
  // Footer Year
  document.getElementById("lastModified").textContent = document.lastModified;
});