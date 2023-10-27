// --------------------------------------------
//     JOB TITLE MOVING ANIMATION
// --------------------------------------------


const jobTitleElement = document.getElementById('job-title');
const cursorElement = document.createElement('span');
cursorElement.classList.add('cursor');
cursorElement.textContent = '|';
jobTitleElement.appendChild(cursorElement);
const jobTitles = [
  'NIKET SENGAR.',
  'N ASPIRING JAVA BACKEND DEVELOPER.'
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


// ------------------------------
//     DOWN TO TOP BUTTON
// ------------------------------


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


// ------------------------------
//          DARK MODE
// ------------------------------

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

// ------------------------------
//     SKILL SECTION TOGGLE
// ------------------------------

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


// ------------------------------
//     PROJECT SLIDER
// ------------------------------

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



// ------------------------------
//          BURGER MENU
// ------------------------------

const toggleButton = document.getElementById('toggle-menu');
const navListItems = document.querySelectorAll('#navList li');
const homeSection = document.getElementById('home');
const burgerIconOpen = document.getElementById('burger-icon-open');
const closeIcon = document.getElementById('close-icon');

const resetBurgerMenu = () => {
  navListItems.forEach(item => {
    item.style.display = 'none';
  });
  burgerIconOpen.style.display = 'block';
  closeIcon.style.display = 'none';
  homeSection.classList.remove('expanded');
  toggleButton.checked = false;
};

toggleButton.addEventListener('click', () => {
  const isExpanded = homeSection.classList.contains('expanded');

  navListItems.forEach(item => {
    item.style.display = isExpanded ? 'none' : 'block';
  });

  if (!isExpanded) {
    burgerIconOpen.style.display = 'none';
    closeIcon.style.display = 'block';
    homeSection.classList.add('expanded');
  } else {
    burgerIconOpen.style.display = 'block';
    closeIcon.style.display = 'none';
    homeSection.classList.remove('expanded');
  }
});

// Adjust navListItems display on window resize
let isSmallScreen = window.innerWidth < 953;

window.addEventListener('resize', () => {
  const isNowSmallScreen = window.innerWidth < 953;
  if (isNowSmallScreen !== isSmallScreen) {
    if (!toggleButton.checked) {
      navListItems.forEach(item => {
        item.style.display = isNowSmallScreen ? 'none' : 'block';
      });
    }
    isSmallScreen = isNowSmallScreen;
  }
});

// Close navList and reset burger menu when a nav item is clicked
navListItems.forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
      return; // Don't close navList for larger screens
    }
    resetBurgerMenu();
  });
});













// function checkVisibility() {
//   const elementsToAnimate = document.querySelectorAll('#skills , .project-card , .github ,#home,#about');

//   elementsToAnimate.forEach((element) => {
//     const elementTop = element.getBoundingClientRect().top;
//     const elementBottom = element.getBoundingClientRect().bottom;
//     const windowHeight = window.innerHeight;

//     // Check if element is in the viewport or slightly above/below
//     if (elementTop < windowHeight - 100 && elementBottom > 0) {
//       element.style.opacity = '1';
//       element.style.transform = 'translateY(0)';
//     } else {
//       element.style.opacity = '0';
//       element.style.transform = 'translateY(40px)';
//     }
//   });
// }

// // Event listener for scrolling
// window.addEventListener('scroll', checkVisibility);

// // Initial check when the page loads
// checkVisibility();





