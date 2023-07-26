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
  

// Function to show/hide the "Go to Top" button based on the scroll position
function handleGoTopButton() {
  const goTopBtn = document.querySelector('.go-top');
  const scrollY = window.scrollY;

  if (scrollY > 200) {
    goTopBtn.classList.add('active');
  } else {
    goTopBtn.classList.remove('active');
  }
}

// Function to scroll to the top when the "Go to Top" button is clicked
function goToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach the handleGoTopButton function to the scroll event
window.addEventListener('scroll', handleGoTopButton);

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

// ---------------------------------PROJECT CARD SLIDER-------------------------
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectContainer = document.querySelector('.project-card-container');

let scrollPosition = 0;
let projectWidth;
let projectsToShow;
let maxScroll;

function setScrollParameters() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    projectWidth = 320;
    projectsToShow = 3;
  } else if (screenWidth >= 768) {
    projectWidth = 280;
    projectsToShow = 1.83; // Show one full card and half of the next card
  } else if (screenWidth <= 767) {
    projectWidth = 230;
    projectsToShow = 1.9;
  }

  const containerWidth = projectContainer.offsetWidth;
  maxScroll = projectContainer.scrollWidth - containerWidth;
  scrollPosition = Math.min(scrollPosition, maxScroll); // Adjust scroll position if it exceeds max scroll
  projectContainer.style.transform = `translateX(-${scrollPosition}px)`;

  // Disable next button when last card is reached
  nextBtn.disabled = scrollPosition >= maxScroll - projectWidth;
  // Change next button background color when disabled
  nextBtn.style.backgroundColor = nextBtn.disabled ? 'gray' : '';

  // Disable previous button when first card is reached
  prevBtn.disabled = scrollPosition === 0;
  // Change previous button background color when disabled
  prevBtn.style.backgroundColor = prevBtn.disabled ? 'gray' : '';

}

function scrollProjects(direction) {
  const scrollAmount = Math.floor(projectWidth * projectsToShow); // Round down to ensure only one card is visible

  if (direction === 'prev') {
    scrollPosition -= scrollAmount;
    scrollPosition = Math.max(scrollPosition, 0);
  } else {
    scrollPosition += scrollAmount;
    scrollPosition = Math.min(scrollPosition, maxScroll);
  }
  projectContainer.style.transform = `translateX(-${scrollPosition}px)`;
  // Disable next button when last card is reached
  nextBtn.disabled = scrollPosition >= maxScroll - projectWidth;
  // Change next button background color when disabled
  nextBtn.style.backgroundColor = nextBtn.disabled ? 'gray' : '';

  // Disable previous button when first card is reached
  prevBtn.disabled = scrollPosition === 0;
  // Change previous button background color when disabled
  prevBtn.style.backgroundColor = prevBtn.disabled ? 'gray' : '';
}

prevBtn.addEventListener('click', scrollProjects.bind(null, 'prev'));
nextBtn.addEventListener('click', scrollProjects.bind(null, 'next'));

window.addEventListener('resize', setScrollParameters);
setScrollParameters();

// ---------------------------------DARK MODE-------------------------
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkbody = document.body;
const logo = document.querySelector('.logo');
const white = document.querySelector('.white');
const black = document.querySelector('.black');

// Function to enable dark mode
function enableDarkMode() {
  darkbody.classList.add('dark-mode');
  localStorage.setItem('darkModeEnabled', true);
  toggleLogoImage(true); // Call the toggleLogoImage function with the darkModeEnabled parameter
}

// Function to disable dark mode
function disableDarkMode() {
  darkbody.classList.remove('dark-mode');
  localStorage.setItem('darkModeEnabled', false);
  toggleLogoImage(false); // Call the toggleLogoImage function with the darkModeEnabled parameter
}

// Check if dark mode is enabled on page load
const darkModeEnabled = localStorage.getItem('darkModeEnabled');

if (darkModeEnabled === 'true') {
  darkModeToggle.checked = true; // Set the checkbox state to checked
  enableDarkMode();
} else {
  darkModeToggle.checked = false; // Set the checkbox state to unchecked
  disableDarkMode();
}

darkModeToggle.addEventListener('change', function () {
  if (darkModeToggle.checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

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





/**
 * skills toggle
 */


// Define the elemToggleFunc function first
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Add the event listener after the function is defined
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtnBox = document.querySelector("[data-toggle-box]");
  const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
  const skillsBox = document.querySelector("[data-skills-box]");

  for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {
      elemToggleFunc(toggleBtnBox);
      for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
      elemToggleFunc(skillsBox);
    });
  }
});
