// Smooth scroll to section
function smoothScroll(target, duration) {
    const targetSection = document.querySelector(target);
    const targetPosition = targetSection.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function scrollAnimation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollY = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollY);
      if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(scrollAnimation);
  }
  
  // Get all the navigation links
const navLinks = document.querySelectorAll('#nav-menu a');
// Navbar links smooth scroll
navLinks.forEach(link => {
  if (!link.classList.contains('resume') && !link.classList.contains('logo')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetSection = link.getAttribute('href');
      smoothScroll(targetSection, 1000); // Set the duration (in milliseconds) as per your preference
    });
  }
});


window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset;

  // Iterate through each section to determine the active section
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.offsetHeight;

    // Check if the current scroll position is within the bounds of the section
    if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
      // Remove the 'active' class from all navigation links
      navLinks.forEach(link => link.classList.remove('active'));

      // Get the corresponding navigation link using the section ID
      const targetNavLink = document.querySelector(`#nav-menu a[href="#${section.id}"]`);

      // Add the 'active' class to the corresponding navigation link
      targetNavLink.classList.add('active');
    }

    // Special case for the contact section
    if (
      currentScroll + window.innerHeight >= document.documentElement.scrollHeight &&
      section.id === 'contact'
    ) {
      // Remove the 'active' class from all navigation links
      navLinks.forEach(link => link.classList.remove('active'));

      // Get the corresponding navigation link using the section ID
      const targetNavLink = document.querySelector(`#nav-menu a[href="#${section.id}"]`);

      // Add the 'active' class to the corresponding navigation link
      targetNavLink.classList.add('active');
    }
  });
});


  
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectContainer = document.querySelector('.project-card-container');

let scrollPosition = 0;
const projectWidth = 320; // Adjust this value to match the width of each project card
const projectsToShow = 3; // Adjust this value to change the number of projects displayed at a time

prevBtn.addEventListener('click', scrollProjects.bind(null, 'prev'));
nextBtn.addEventListener('click', scrollProjects.bind(null, 'next'));

function scrollProjects(direction) {
  const containerWidth = projectContainer.offsetWidth;
  const scrollAmount = projectWidth * projectsToShow;
  const maxScroll = projectContainer.scrollWidth - containerWidth;

  if (direction === 'prev') {
    scrollPosition -= scrollAmount;
    scrollPosition = Math.max(scrollPosition, 0);
  } else {
    scrollPosition += scrollAmount;
    scrollPosition = Math.min(scrollPosition, maxScroll);
  }
  projectContainer.style.transform = `translateX(-${scrollPosition}px)`;
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkbody = document.body;
const logo = document.querySelector('.logo');
const white = document.querySelector('.white');
const black = document.querySelector('.black');

darkModeToggle.addEventListener('change', function () {
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

function enableDarkMode() {
  darkbody.classList.add('dark-mode');
  localStorage.setItem('darkModeEnabled', true);
  toggleLogoImage(true); // Call the toggleLogoImage function with the darkModeEnabled parameter
}

function disableDarkMode() {
  darkbody.classList.remove('dark-mode');
  localStorage.setItem('darkModeEnabled', false);
  toggleLogoImage(false); // Call the toggleLogoImage function with the darkModeEnabled parameter
}

// Check if dark mode was previously enabled
const darkModeEnabled = localStorage.getItem('darkModeEnabled');

if (darkModeEnabled && darkModeEnabled === 'true') {
  enableDarkMode();
}

// Function to toggle the logo image
function toggleLogoImage(darkModeEnabled) {
  if (darkModeEnabled) {
    // Update the image display for dark mode
    black.style.display = 'none';
    white.style.display = 'block';
  } else {
    // Update the image display for light mode
    black.style.display = 'block';
    white.style.display = 'none';
  }
}

