document.addEventListener("DOMContentLoaded", function () {
  // CONTACT FORM SUBMIT
  document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = this;
  const submitButton = form.querySelector("button");
  const formData = new FormData(form);

  // Show loading animation
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  })
    .catch(error => {
      console.error("Fetch error:", error);
    })
    .finally(() => {
      // Always show success message
      showSuccessMessage("✅ Thanks for your message! I'll get back to you soon.");
      form.reset();
      submitButton.disabled = false;
      submitButton.innerHTML = "Send Message";
    });
});

function showSuccessMessage(message) {
  const messageBox = document.getElementById("success-message");
  messageBox.innerHTML = message;
  messageBox.classList.add("show");

  setTimeout(() => {
    messageBox.classList.remove("show");
    messageBox.innerHTML = "";
  }, 5000);
}


  // DOWNLOAD RESUME FUNCTION
  window.downloadResume = function () {
    const link = document.createElement('a');
    link.href = 'BK_RESUME.pdf';
    link.download = 'BK_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add the scroll lock class on load
  document.documentElement.classList.add("scroll-lock");
  document.body.classList.add("scroll-lock");

  // Wait 2.5 seconds, then remove it
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.documentElement.classList.remove("scroll-lock");
      document.body.classList.remove("scroll-lock");
    }, 2500);
  });

  // Disable scroll + click for 2.5 seconds
document.body.style.overflow = 'hidden';
const freezeOverlay = document.getElementById('freeze-overlay');

setTimeout(() => {
  document.body.style.overflow = '';
  freezeOverlay.remove(); // Remove overlay after 2.5s
}, 2500);

const carousel = document.querySelector(".portfolio-carousel");
const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
const portfolioDetails = document.querySelectorAll(".portfolio-details");
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");

const slides = imgSlide.children;
const totalSlides = slides.length;

let index = 1; // start from first real slide (after clone)
let autoScrollInterval;

// Clone first and last slide for smooth infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
imgSlide.appendChild(firstClone);
imgSlide.insertBefore(lastClone, slides[0]);

// Update totalSlides count again after clone
const updatedSlides = imgSlide.children;
const totalUpdatedSlides = updatedSlides.length;

// Set initial position
imgSlide.style.transform = `translateX(calc(-100% - 2rem))`;

function updateCarousel(animate = true) {
  if (animate) imgSlide.style.transition = "transform 0.5s ease-in-out";
  else imgSlide.style.transition = "none";

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

  portfolioDetails.forEach((detail, i) => {
    detail.classList.toggle("active", i === (index - 1) % portfolioDetails.length);
  });
}

function nextSlide() {
  if (index >= totalUpdatedSlides - 1) return;
  index++;
  updateCarousel();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  updateCarousel();
}

imgSlide.addEventListener("transitionend", () => {
  // Reset to first real slide if we've reached the clone at end
  if (index === totalUpdatedSlides - 1) {
    index = 1;
    updateCarousel(false);
  }

  // Reset to last real slide if we've reached the clone at start
  if (index === 0) {
    index = totalSlides;
    updateCarousel(false);
  }

  // Restart auto scroll only after transition ends
  stopAutoScroll();
  startAutoScroll();
});

arrowRight.addEventListener("click", () => {
  nextSlide();
  stopAutoScroll(); // Stop immediately, auto scroll will resume after transition ends
});

arrowLeft.addEventListener("click", () => {
  prevSlide();
  stopAutoScroll();
});

// Auto-scroll controls
function startAutoScroll() {
  stopAutoScroll(); // Ensure no duplicates
  autoScrollInterval = setInterval(nextSlide, 5000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Pause auto-scroll on hover
const container = document.querySelector(".portfolio-container");
container.addEventListener("mouseenter", stopAutoScroll);
container.addEventListener("mouseleave", startAutoScroll);

// Initialize carousel
updateCarousel(false);
startAutoScroll();

const nextBtn = document.querySelector('.nav-right');
const prevBtn = document.querySelector('.nav-left');
const workInfos = document.querySelectorAll('.work-info');

let currentIndex = 0;

function updateWorkDetails() {
  workInfos.forEach((info, i) => {
    info.classList.toggle('active', i === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === workInfos.length - 1;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < workInfos.length - 1) {
    currentIndex++;
    updateWorkDetails();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateWorkDetails();
  }
});

updateWorkDetails(); // Initialize

});