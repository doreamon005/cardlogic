// Contact form validation and success alert
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (name === "" || email === "" || message === "") {
      alert("Please fill out all fields.");
      return;
    }
  
    // Simulated submit
    alert("✅ Message sent successfully! We'll reach out soon.");
    this.reset();
  });
  