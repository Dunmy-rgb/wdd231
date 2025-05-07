document.getElementById("lastModified").textContent = document.lastModified;

function filterCourses(category) {
  const allButtons = document.querySelectorAll('.course-buttons button');

  allButtons.forEach(btn => {
    if (category === 'all') {
      btn.style.display = 'inline-block';
    } else {
      btn.style.display = btn.classList.contains(category) ? 'inline-block' : 'none';
    }
  });
}
