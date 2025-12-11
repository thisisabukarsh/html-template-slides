// ===== GLOBAL STATE =====
let slides = [];
let currentSlideIndex = 0;
let presentationData = null;

// ===== DOM ELEMENTS =====
const slidesContainer = document.getElementById("slides-container");
const currentSlideEl = document.getElementById("current-slide");
const totalSlidesEl = document.getElementById("total-slides");
const progressFill = document.getElementById("progress-fill");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const overviewBtn = document.getElementById("overview-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const overviewContainer = document.getElementById("overview-container");
const overviewGrid = document.getElementById("overview-grid");
const closeOverview = document.getElementById("close-overview");
const loadingEl = document.getElementById("loading");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const helpOverlay = document.getElementById("help-overlay");
const closeHelp = document.getElementById("close-help");

// ===== INITIALIZATION =====
async function init() {
  try {
    // Load presentation data from JSON
    const response = await fetch("slides.json");
    if (!response.ok) {
      throw new Error("Failed to load slides.json. Make sure the file exists!");
    }

    presentationData = await response.json();

    // Validate data
    if (!presentationData.slides || !Array.isArray(presentationData.slides)) {
      throw new Error(
        'Invalid slides.json format. Must have a "slides" array.'
      );
    }

    if (presentationData.slides.length === 0) {
      throw new Error("No slides found in slides.json");
    }

    // Set document title if provided
    if (presentationData.title) {
      document.title = presentationData.title;
    }

    // Generate slides HTML
    generateSlides();

    // Load saved progress
    loadProgress();

    // Initialize UI
    updateUI();
    generateOverview();

    // Setup event listeners
    setupEventListeners();

    // Hide loading screen
    setTimeout(() => {
      loadingEl.classList.add("hidden");
    }, 500);
  } catch (error) {
    showError(error.message);
  }
}

// ===== SLIDE GENERATION =====
function generateSlides() {
  slidesContainer.innerHTML = "";
  slides = [];

  presentationData.slides.forEach((slideData, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = `slide layout-${slideData.layout || "content"}`;
    slideEl.dataset.index = index;

    // Generate slide content based on layout
    switch (slideData.layout) {
      case "title":
        slideEl.innerHTML = generateTitleSlide(slideData);
        break;
      case "two-column":
        slideEl.innerHTML = generateTwoColumnSlide(slideData);
        break;
      case "image":
        slideEl.innerHTML = generateImageSlide(slideData);
        break;
      default:
        slideEl.innerHTML = generateContentSlide(slideData);
    }

    slidesContainer.appendChild(slideEl);
    slides.push(slideEl);
  });

  // Make first slide active
  if (slides.length > 0) {
    slides[0].classList.add("active");
  }

  totalSlidesEl.textContent = slides.length;
}

function generateTitleSlide(data) {
  return `
        <h1 class="slide-heading">${escapeHtml(data.heading || "")}</h1>
        ${
          data.subheading
            ? `<p class="slide-subheading">${escapeHtml(data.subheading)}</p>`
            : ""
        }
    `;
}

function generateContentSlide(data) {
  let content = "";

  // Add heading if exists
  if (data.heading) {
    content += `<h2 class="slide-heading">${escapeHtml(data.heading)}</h2>`;
  }

  // Add content div
  content += '<div class="slide-content">';

  // Add text if exists
  if (data.text) {
    content += `<p>${escapeHtml(data.text)}</p>`;
  }

  // Add bullets if exists
  if (data.bullets && Array.isArray(data.bullets)) {
    content += "<ul>";
    data.bullets.forEach((bullet) => {
      content += `<li>${escapeHtml(bullet)}</li>`;
    });
    content += "</ul>";
  }

  // Add numbered list if exists
  if (data.numbered && Array.isArray(data.numbered)) {
    content += "<ol>";
    data.numbered.forEach((item) => {
      content += `<li>${escapeHtml(item)}</li>`;
    });
    content += "</ol>";
  }

  // Add image if exists
  if (data.image) {
    content += `<img src="${escapeHtml(data.image)}" alt="${escapeHtml(
      data.imageAlt || ""
    )}" style="max-width: 100%; margin-top: 20px; border-radius: 10px;">`;
  }

  content += "</div>";
  return content;
}

function generateTwoColumnSlide(data) {
  let content = "";

  if (data.heading) {
    content += `<h2 class="slide-heading">${escapeHtml(data.heading)}</h2>`;
  }

  content += '<div class="two-column-container">';

  // Left column
  content += '<div class="column">';
  if (data.leftHeading) {
    content += `<h3>${escapeHtml(data.leftHeading)}</h3>`;
  }
  if (data.leftContent) {
    if (Array.isArray(data.leftContent)) {
      content += "<ul>";
      data.leftContent.forEach((item) => {
        content += `<li>${escapeHtml(item)}</li>`;
      });
      content += "</ul>";
    } else {
      content += `<p>${escapeHtml(data.leftContent)}</p>`;
    }
  }
  content += "</div>";

  // Right column
  content += '<div class="column">';
  if (data.rightHeading) {
    content += `<h3>${escapeHtml(data.rightHeading)}</h3>`;
  }
  if (data.rightContent) {
    if (Array.isArray(data.rightContent)) {
      content += "<ul>";
      data.rightContent.forEach((item) => {
        content += `<li>${escapeHtml(item)}</li>`;
      });
      content += "</ul>";
    } else {
      content += `<p>${escapeHtml(data.rightContent)}</p>`;
    }
  }
  content += "</div>";

  content += "</div>";
  return content;
}

function generateImageSlide(data) {
  let content = "";

  if (data.heading) {
    content += `<h2 class="slide-heading">${escapeHtml(data.heading)}</h2>`;
  }

  if (data.image) {
    content += `<img src="${escapeHtml(data.image)}" alt="${escapeHtml(
      data.imageAlt || ""
    )}" class="slide-image">`;
  }

  if (data.caption) {
    content += `<p class="image-caption">${escapeHtml(data.caption)}</p>`;
  }

  return content;
}

// ===== NAVIGATION =====
function goToSlide(index) {
  if (index < 0 || index >= slides.length || index === currentSlideIndex) {
    return;
  }

  const oldIndex = currentSlideIndex;
  const goingBackward = index < currentSlideIndex;

  // Remove active class from current slide
  slides[oldIndex].classList.remove("active");

  // Update index
  currentSlideIndex = index;

  if (goingBackward) {
    // Going backward - new slide comes from LEFT
    slides[oldIndex].classList.remove("previous"); // Old slide stays at center then goes right
    slides[index].classList.add("previous"); // Position new slide on the left

    // Force browser to register the position before animating
    slides[index].offsetHeight; // Trigger reflow

    // Now animate to center
    slides[index].classList.remove("previous");
    slides[index].classList.add("active");
  } else {
    // Going forward - new slide comes from RIGHT
    slides[oldIndex].classList.add("previous"); // Old slide goes left
    slides[index].classList.remove("previous"); // Ensure new slide is on the right (default)
    slides[index].classList.add("active"); // Animate from right to center
  }

  // Update UI
  updateUI();

  // Save progress
  saveProgress();
}

function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    goToSlide(currentSlideIndex + 1);
  }
}

function previousSlide() {
  if (currentSlideIndex > 0) {
    goToSlide(currentSlideIndex - 1);
  }
}

function firstSlide() {
  goToSlide(0);
}

function lastSlide() {
  goToSlide(slides.length - 1);
}

// ===== UI UPDATES =====
function updateUI() {
  // Update slide counter
  currentSlideEl.textContent = currentSlideIndex + 1;

  // Update progress bar
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;
  progressFill.style.width = `${progress}%`;

  // Update navigation buttons
  prevBtn.disabled = currentSlideIndex === 0;
  nextBtn.disabled = currentSlideIndex === slides.length - 1;

  // Update overview if visible
  if (
    !overviewContainer.classList.contains("hidden") &&
    overviewContainer.classList.contains("visible")
  ) {
    updateOverviewHighlight();
  }
}

// ===== OVERVIEW MODE =====
function generateOverview() {
  overviewGrid.innerHTML = "";

  presentationData.slides.forEach((slideData, index) => {
    const overviewSlide = document.createElement("div");
    overviewSlide.className = "overview-slide";
    overviewSlide.dataset.index = index;

    if (index === currentSlideIndex) {
      overviewSlide.classList.add("current");
    }

    // Create preview content
    let previewText = "";
    if (slideData.text) {
      previewText = slideData.text;
    } else if (slideData.bullets && slideData.bullets.length > 0) {
      previewText = slideData.bullets.slice(0, 2).join(". ");
    } else if (slideData.subheading) {
      previewText = slideData.subheading;
    }

    overviewSlide.innerHTML = `
            <div class="overview-slide-number">Slide ${index + 1}</div>
            <h3 class="overview-slide-heading">${escapeHtml(
              slideData.heading || "Slide " + (index + 1)
            )}</h3>
            ${
              previewText
                ? `<p class="overview-slide-preview">${escapeHtml(
                    previewText
                  )}</p>`
                : ""
            }
        `;

    overviewSlide.addEventListener("click", () => {
      goToSlide(index);
      toggleOverview();
    });

    overviewGrid.appendChild(overviewSlide);
  });
}

function updateOverviewHighlight() {
  const overviewSlides = overviewGrid.querySelectorAll(".overview-slide");
  overviewSlides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.classList.add("current");
      slide.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      slide.classList.remove("current");
    }
  });
}

function toggleOverview() {
  overviewContainer.classList.toggle("hidden");
  overviewContainer.classList.toggle("visible");

  if (overviewContainer.classList.contains("visible")) {
    updateOverviewHighlight();
  }
}

// ===== FULLSCREEN =====
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log("Fullscreen error:", err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// ===== HELP OVERLAY =====
function toggleHelp() {
  helpOverlay.classList.toggle("visible");
}

// ===== PROGRESS SAVING =====
function saveProgress() {
  try {
    localStorage.setItem(
      "presentation-progress",
      JSON.stringify({
        slideIndex: currentSlideIndex,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    console.log("Could not save progress:", e);
  }
}

function loadProgress() {
  try {
    const saved = localStorage.getItem("presentation-progress");
    if (saved) {
      const data = JSON.parse(saved);
      // Only load progress if it's from the last 24 hours
      const dayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp < dayInMs) {
        currentSlideIndex = Math.min(data.slideIndex, slides.length - 1);
        slides.forEach((slide, index) => {
          slide.classList.remove("active");
          if (index === currentSlideIndex) {
            slide.classList.add("active");
          }
        });
      }
    }
  } catch (e) {
    console.log("Could not load progress:", e);
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Navigation buttons
  prevBtn.addEventListener("click", previousSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Control buttons
  overviewBtn.addEventListener("click", toggleOverview);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  closeOverview.addEventListener("click", toggleOverview);

  // Help overlay
  closeHelp.addEventListener("click", toggleHelp);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        e.preventDefault();
        nextSlide();
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        previousSlide();
        break;
      case "Home":
        e.preventDefault();
        firstSlide();
        break;
      case "End":
        e.preventDefault();
        lastSlide();
        break;
      case "o":
      case "O":
        e.preventDefault();
        toggleOverview();
        break;
      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;
      case "Escape":
        e.preventDefault();
        if (overviewContainer.classList.contains("visible")) {
          toggleOverview();
        } else if (helpOverlay.classList.contains("visible")) {
          toggleHelp();
        } else if (document.fullscreenElement) {
          toggleFullscreen();
        }
        break;
      case "?":
        e.preventDefault();
        toggleHelp();
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        previousSlide();
      }
    }
  }

  // Prevent context menu on long press (mobile)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

// ===== ERROR HANDLING =====
function showError(message) {
  loadingEl.classList.add("hidden");
  errorContainer.classList.remove("hidden");
  errorMessage.textContent = message;
}

// ===== UTILITY FUNCTIONS =====
function escapeHtml(text) {
  if (typeof text !== "string") return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ===== START APPLICATION =====
document.addEventListener("DOMContentLoaded", init);
