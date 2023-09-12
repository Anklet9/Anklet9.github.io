// JOB TITLE MOVING ANIMATION
const jobTitleElement = document.getElementById('job-title');
const cursorElement = document.createElement('span');
cursorElement.classList.add('cursor');
cursorElement.textContent = '|';
jobTitleElement.appendChild(cursorElement);
const jobTitles = [
  'NIKET SENGAR.',
  'n Aspiring Java Backend Developer.'
];
let currentIndex = 0;

function updateJobTitle() {
  const currentJobTitle = jobTitles[currentIndex];
  const typingDelay = 150; // Delay between typing each character
  const erasingDelay = 100; // Delay before erasing the job title

  let i = 0;
  let isErasing = false;

  function typeNextCharacter() {
    if (isErasing) {
      const updatedJobTitle = currentJobTitle.slice(0, i);
      jobTitleElement.textContent = updatedJobTitle;
      i--;
      if (i === 0) {
        isErasing = false;
        currentIndex = (currentIndex + 1) % jobTitles.length;
        setTimeout(updateJobTitle, 500);
      } else {
        setTimeout(typeNextCharacter, erasingDelay);
      }
    } else {
      const updatedJobTitle = currentJobTitle.slice(0, i) + '|';
      jobTitleElement.textContent = updatedJobTitle;
      i++;
      if (i <= currentJobTitle.length) {
        setTimeout(typeNextCharacter, typingDelay);
      } else {
        isErasing = true;
        cursorElement.style.visibility = 'hidden'; // Hide cursor when erasing
        setTimeout(typeNextCharacter, erasingDelay);
      }
    }
  }

  typeNextCharacter();
}
updateJobTitle();
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


// PROJECT SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const projectContainers = document.querySelectorAll(".project-container");
  const toggleButtons = document.querySelectorAll('[data-toggle-btn2]');
  const projectToggle = document.querySelector('.project-toggle');

  // Function to filter and display projects based on the selected category
  function filterProjects(selectedCategory) {
    projectContainers.forEach((container) => {
      const projectTechStack = container.querySelector(".project-tech-stack").textContent.toLowerCase();

      if ((selectedCategory === "enterprise" && projectTechStack.includes("core java")) ||
        (selectedCategory === "full stack" && projectTechStack.includes("html"))) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });
  }

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the "active" class from all buttons
      toggleButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add the "active" class to the clicked button
      button.classList.add("active");

      // Move the color slider to the clicked button's position
      const sliderPosition = button.offsetLeft;
      projectToggle.style.setProperty('--slider-left', sliderPosition + 2 + "px");

      // Determine the selected category based on the button's text
      const selectedCategory = button.textContent.toLowerCase();

      // Call the filterProjects function to display the projects
      filterProjects(selectedCategory);
    });
  });

  // Initialize the filter with the default category ("Enterprise")
  filterProjects("enterprise");
});
