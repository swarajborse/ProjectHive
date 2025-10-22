document.getElementById('portfolioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const bio = document.getElementById('bio').value;
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
  const projects = document.getElementById('projects').value.split('\n').map(p => p.trim());
  const email = document.getElementById('email').value;
  const github = document.getElementById('github').value;

  const previewHTML = `
    <h2>${name}</h2>
    <p>${bio}</p>
    <h3>Skills</h3>
    <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    <h3>Projects</h3>
    <ul>${projects.map(project => `<li>${project}</li>`).join('')}</ul>
    <h3>Contact</h3>
    <p>Email: <a href="mailto:${email}">${email}</a></p>
    <p>GitHub: <a href="${github}" target="_blank">${github}</a></p>
  `;

  document.getElementById('preview').innerHTML = previewHTML;
});