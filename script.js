// Load existing donors or start empty
const donors = JSON.parse(localStorage.getItem('donors')) || [];

// Handle registration
document.getElementById('donorForm').addEventListener('submit', e => {
  e.preventDefault();
  const name       = document.getElementById('donorName').value.trim();
  const contact    = document.getElementById('donorContact').value.trim();
  const bloodGroup = document.getElementById('donorBloodGroup').value;
  const city       = document.getElementById('donorCity').value.trim();

  if (!name || !contact || !bloodGroup || !city) return;

  donors.push({ name, contact, bloodGroup, city });
  localStorage.setItem('donors', JSON.stringify(donors));
  alert('Donor registered successfully!');
  e.target.reset();
});

// Handle requests
document.getElementById('requestForm').addEventListener('submit', e => {
  e.preventDefault();
  const bg   = document.getElementById('requestBloodGroup').value;
  const city = document.getElementById('requestCity').value.trim().toLowerCase();

  const matches = donors.filter(d =>
    d.city.toLowerCase() === city &&
    (bg === 'All' || d.bloodGroup === bg)
  );

  const list = document.getElementById('donorList');
  if (matches.length) {
    list.innerHTML = matches
      .map(d => `<li>${d.name} — ${d.contact} (${d.bloodGroup})</li>`)
      .join('');
  } else {
    list.innerHTML = '<li>No matching donors found.</li>';
  }
});
