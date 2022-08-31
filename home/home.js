
// TO MAKE NAVBAR RESPONSIVE ON DIFF. SCREEN SIZES:
const toggleButton = document.getElementsByClassName('toggle-btn')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', (event) => {
  event.preventDefault(); // To prevent automatic loading of the page once the btn is clicked.
  navbarLinks.classList.toggle('active');
})
