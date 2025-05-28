document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp field
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Open modals
  document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  // Close modals
  document.querySelectorAll('.membership-modal .close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dialog = e.target.closest('dialog');
      if (dialog) dialog.close();
    });
  });
});
