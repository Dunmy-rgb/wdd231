// Function to decode URL parameters and display them
function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById('submittedData');

  if (!params.toString()) {
    container.innerHTML = '<p>No data submitted.</p>';
    return;
  }

  // Define friendly labels for fields
  const labels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    organizationalTitle: 'Organizational Title',
    email: 'Email Address',
    phone: 'Phone Number',
    organization: 'Business/Organization Name',
    membership: 'Membership Level',
    description: 'Business Description',
    timestamp: 'Submitted On'
  };

  params.forEach((value, key) => {
    if (labels[key]) {
      const dt = document.createElement('dt');
      dt.textContent = labels[key];
      const dd = document.createElement('dd');
      // Format timestamp nicely
      if (key === 'timestamp') {
        const date = new Date(value);
        dd.textContent = date.toLocaleString();
      } else {
        dd.textContent = value;
      }
      container.appendChild(dt);
      container.appendChild(dd);
    }
  });
}

displayFormData();
