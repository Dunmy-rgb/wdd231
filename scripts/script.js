document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("show");
  });

  document.getElementById("lastModified").textContent = document.lastModified;

  const courseDetails = document.getElementById("course-details");

  //  course data
const courses = [
  {
    subject: "CSE",
    number: "110",
    title: "Intro to Programming",
    credits: 3,
    description: "Learn basic programming concepts using Python.",
    certificate: "Yes",
    technology: ["Python", "VS Code", "GitHub"]
  },
  {
    subject: "WDD",
    number: "130",
    title: "Web Fundamentals",
    credits: 3,
    description: "Learn HTML, CSS, and the basics of web development.",
    certificate: "Yes",
    technology: ["HTML", "CSS", "GitHub Pages"]
  },
  {
    subject: "CSE",
    number: "111",
    title: "Programming with Functions",
    credits: 3,
    description: "Master function-based programming and basic algorithms.",
    certificate: "Yes",
    technology: ["Python", "Replit"]
  },
  {
    subject: "CSE",
    number: "210",
    title: "Object-Oriented Programming",
    credits: 3,
    description: "Explore principles of OOP in modern programming languages.",
    certificate: "Yes",
    technology: ["Python", "OOP Principles", "UML"]
  },
  {
    subject: "WDD",
    number: "131",
    title: "Dynamic Web Pages",
    credits: 3,
    description: "Build interactive websites using JavaScript and DOM manipulation.",
    certificate: "Yes",
    technology: ["JavaScript", "DOM", "Events"]
  },
  {
    subject: "WDD",
    number: "231",
    title: "Frontend Web Development",
    credits: 3,
    description: "Advanced styling and interactivity using CSS and JS frameworks.",
    certificate: "Yes",
    technology: ["CSS Grid", "Flexbox", "APIs", "Fetch"]
  }
];


  function displayCourseDetails(course) {
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });

    courseDetails.addEventListener("click", (e) => {
      const rect = courseDetails.getBoundingClientRect();
      if (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      ) {
        courseDetails.close();
      }
    });
  }

  // Add event listeners to all course buttons
  const courseButtons = document.querySelectorAll(".course-buttons button");

  courseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const [subject, number] = button.textContent.split(" ");
      const course = courses.find(
        c => c.subject === subject && c.number === number
      );
      if (course) displayCourseDetails(course);
    });
  });

  // Filtering courses
  window.filterCourses = function (category) {
    const allButtons = document.querySelectorAll('.course-buttons button');
    allButtons.forEach(btn => {
      if (category === 'all') {
        btn.style.display = 'inline-block';
      } else {
        btn.style.display = btn.classList.contains(category) ? 'inline-block' : 'none';
      }
    });
  };
});
