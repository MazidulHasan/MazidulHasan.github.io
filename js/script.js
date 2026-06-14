// Reveal the page as soon as the DOM is usable. Offscreen media can keep loading
// without hiding the hero or consuming its entrance animation.
document.addEventListener("DOMContentLoaded", function () {
  const loading = document.getElementById("loading");
  requestAnimationFrame(() => {
    const startHeroAnimation = () => {
      document.body.classList.add("page-loaded");
    };

    loading.addEventListener("transitionend", startHeroAnimation, {
      once: true,
    });
    loading.classList.add("hidden");
    // Fallback for browsers or user settings that suppress transitions.
    setTimeout(startHeroAnimation, 600);
    // Animate skill progress bars
    animateSkillBars();
    // Initialize navigation
    initNavigation();
    // Auto-update stats counters
    updateStatsCounters();
  });
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (mobileMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");

      // Close mobile menu if open
      mobileMenu.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");

      if (targetId === "#") {
        // Scroll to top for home link
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll to section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 150; // Offset for fixed navbar
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPos >= sectionTop &&
        scrollPos < sectionTop + sectionHeight
      ) {
        currentSection = sectionId;
      }
    });

    // Special handling for the last section (contact) when near bottom
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = window.scrollY + windowHeight;

    if (scrollBottom >= documentHeight - 100) {
      currentSection = "contact";
    }

    // Special case for home/top of page
    if (window.scrollY < 50) {
      currentSection = "";
    }

    // Update active states
    navLinks.forEach((link) => link.classList.remove("active"));

    if (currentSection) {
      const activeLink = document.querySelector(
        `.nav-link[href="#${currentSection}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    } else {
      // Home section
      const homeLink = document.querySelector('.nav-link[href="#"]');
      if (homeLink) {
        homeLink.classList.add("active");
      }
    }
  }
}

// Auto-update stats based on actual content
function updateStatsCounters() {
  // Count projects - look for test-cards that contain GitHub links (actual projects)
  const projectCards = document.querySelectorAll(
    '.test-card a[href*="github.com"]'
  );
  const projectCount = projectCards.length;

  // Count individual skills listed in the skills section.
  const skillTags = document.querySelectorAll("#skills .skill-pill");
  const skillCount = skillTags.length;

  // Update the counters with animation
  animateCounter("projectCount", projectCount, "+");
  animateCounter("skillCount", skillCount, "+");
}

// Animate counter with counting effect
function animateCounter(elementId, targetValue, suffix = "") {
  const element = document.getElementById(elementId);
  if (!element) return;

  const startValue = 0;
  const increment = targetValue / 50; // More steps for smoother animation
  let currentValue = startValue;

  // Add counting animation class
  element.classList.add("counting");
  element.style.animation = "counterPulse 0.1s ease-in-out infinite";

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(timer);
      // Remove counting animation when done
      element.classList.remove("counting");
      element.style.animation = "";
      // Add completion effect
      element.style.transform = "scale(1.1)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 200);
    }
    element.textContent = Math.floor(currentValue) + suffix;
  }, 30); // Faster updates for smoother counting
}

// Animate skill progress bars
// Animate skill progress bars - removed floating animation
function animateSkillBars() {
  // Just add a subtle fade-in without any translateY movement
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.opacity = "0.8";
      tag.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        tag.style.opacity = "1";
      }, 50);
    }, index * 20); // Very fast stagger
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Add visual feedback for form submission
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Formspree will handle the actual submission and redirect
      // The button will be re-enabled when the page reloads or user returns
    });
  }
});

// Copy email function
function copyEmail() {
  const email = "md.mazidulhasan1@gmail.com";

  // Modern way using Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        showCopySuccess();
      })
      .catch(() => {
        fallbackCopyTextToClipboard(email);
      });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(email);
  }
}

// Fallback copy method
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showCopySuccess();
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    alert("Email: md.mazidulhasan1@gmail.com");
  }

  document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess() {
  const button = event.target.closest("button");
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-check"></i> Copied!';
  button.style.background = "#28a745";

  setTimeout(() => {
    button.innerHTML = originalText;
    button.style.background = "#6c757d";
  }, 2000);
}

// Enhanced scroll effects with progress bar and animations
let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Scroll progress bar
  const winHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollY / winHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + "%";
  }

  // Show/hide scroll to top button
  if (scrollToTopBtn) {
    if (scrollY > 500) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }

  // Parallax effect for skill cards - DISABLED to prevent floating
  // const skillTags = document.querySelectorAll(".skill-tag");
  // skillTags.forEach((tag, index) => {
  //   const rect = tag.getBoundingClientRect();
  //   const speed = 0.5 + (index % 3) * 0.1; // Varied speeds
  //   const yPos = -(scrollY * speed * 0.1);
  //   if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
  //     tag.style.transform = `translateY(${yPos}px)`;
  //   }
  // });

  // Direction-based animations
  const scrollDirection = scrollY > lastScrollTop ? "down" : "up";
  document.body.setAttribute("data-scroll-direction", scrollDirection);
  lastScrollTop = scrollY;
});

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Enhanced Intersection Observer for varied animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;

      // Add appropriate animation class based on element type
      if (target.classList.contains("test-card")) {
        target.classList.add("scroll-scale", "visible");
      } else if (target.classList.contains("stat-card")) {
        target.classList.add("scroll-slide-left", "visible");
      } else {
        target.classList.add("scroll-fade-in", "visible");
      }

      // Stagger animations for child elements
      const children = target.querySelectorAll(
        ".skill-tag, .test-card, .stat-card"
      );
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe sections and cards for scroll animations
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    "section, .test-card, .stat-card, .contact-form"
  );

  elementsToAnimate.forEach((element, index) => {
    // Set initial animation state
    if (element.tagName === "SECTION") {
      element.classList.add("scroll-fade-in");
    }

    observer.observe(element);
  });

  prepareSkillAnimations();

  // Initialize SQA scroll animations
  initScrollAnimations();
});

function prepareSkillAnimations() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) {
    return;
  }

  skillsSection.classList.add("skills-motion-enabled");

  let skillIndex = 0;

  skillsSection.querySelectorAll(".skill-category-card").forEach((card, cardIndex) => {
    const cardDelay = cardIndex * 0.1;
    card.style.setProperty("--card-delay", `${cardDelay}s`);
    card.style.setProperty("--sweep-delay", `${cardDelay + 0.28}s`);

    card.querySelectorAll(".skill-pill").forEach((pill) => {
      pill.style.setProperty(
        "--pill-delay",
        `${0.28 + skillIndex * 0.04}s`
      );
      skillIndex += 1;
    });
  });

  const skillGrid = skillsSection.querySelector(".skills-grid");
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      skillsSection.classList.add("skills-animate");
      setTimeout(() => {
        skillsSection.classList.add("skills-animation-complete");
      }, 2700);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  });

  if (skillGrid) {
    skillObserver.observe(skillGrid);
  }
}

// Scroll Animation Observer for SQA sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.08, // Sweet spot - trigger when 8% visible
    rootMargin: "0px 0px -30px 0px", // Balanced start distance
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Reduced delay for faster section appearance
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 30); // Balanced timing - not instant, not slow

        // Trigger specific animations based on section
        const sectionTitle = entry.target.querySelector("h2");
        if (sectionTitle) {
          const title = sectionTitle.textContent;

          if (title.includes("About Me")) {
            // Trigger QA metrics animation with more delay
            setTimeout(() => {
              const metrics =
                entry.target.querySelectorAll(".test-progress");
              metrics.forEach((metric, index) => {
                setTimeout(() => {
                  metric.style.animation =
                    "testRunning 2s ease-in-out forwards";
                }, index * 600); // Increased delay between metrics
              });
            }, 800); // Increased initial delay
          }

          if (title.includes("What I Test For")) {
            // Animate test cards with enhanced stagger effect
            const testCards = entry.target.querySelectorAll(".test-card");
            testCards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
                card.style.animation = `testCardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

                // Add a subtle pulse effect on entrance
                setTimeout(() => {
                  card.style.animation += ", cardPulse 0.3s ease-out";
                }, 800);
              }, index * 120); // Slightly longer stagger for better visual flow
            });
          }
        }
      }
    });
  }, observerOptions);

  // Observe all animated sections with staggered delays
  document
    .querySelectorAll(".section-animated")
    .forEach((section, index) => {
      // Add a CSS custom property for staggered animation delays
      section.style.setProperty("--section-delay", `${index * 0.08}s`); // Balanced stagger timing
      observer.observe(section);
    });
}

// Add random terminal effects
function addTerminalEffects() {
  setInterval(() => {
    const terminals = document.querySelectorAll(".terminal-content");
    terminals.forEach((terminal) => {
      if (Math.random() > 0.8) {
        terminal.style.animation = "glitch 0.2s ease-in-out";
        setTimeout(() => {
          terminal.style.animation = "";
        }, 200);
      }
    });
  }, 8000);
}

// Start terminal effects after page load
setTimeout(addTerminalEffects, 3000);

// Smart Responsive Carousel System
class SmartCarousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.track = this.container.querySelector(".carousel-track");
    this.items = this.track.querySelectorAll(".carousel-item");
    this.badges = this.container.querySelectorAll(".carousel-badge");

    // Look for navigation buttons in the parent container (outside the smart carousel container)
    const parentContainer = this.container.parentElement;
    this.prevBtn = parentContainer.querySelector(".carousel-nav.prev");
    this.nextBtn = parentContainer.querySelector(".carousel-nav.next");

    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();
    this.totalItems = this.items.length;

    this.init();
    this.setupEventListeners();
    this.updateVisibility();
  }

  getItemsPerView() {
    if (this.container.id === "linkedinCarousel") return 1;

    // Use window.innerWidth to match CSS media queries exactly
    const viewportWidth = window.innerWidth;
    if (viewportWidth >= 1200) return 3;
    if (viewportWidth >= 768) return 2;
    return 1;
  }

  init() {
    this.updateCarousel();
    this.updateBadges();
  }

  setupEventListeners() {
    // Badge click handlers
    this.badges.forEach((badge, index) => {
      badge.addEventListener("click", () => {
        this.goToSlide(index);
      });
    });

    // Navigation button handlers
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.navigate(-1);
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.navigate(1);
      });
    }

    // Window resize handler
    window.addEventListener("resize", () => {
      const oldItemsPerView = this.itemsPerView;
      this.itemsPerView = this.getItemsPerView();

      // Reset current index if items per view changed
      if (oldItemsPerView !== this.itemsPerView) {
        this.currentIndex = 0;
      }

      this.updateCarousel();
      this.updateVisibility();
    });
  }

  updateCarousel() {
    // For single-post navigation, calculate width of one card regardless of screen size
    const containerWidth = this.container.offsetWidth;

    let slideDistance;
    if (this.itemsPerView === 1) {
      const singleItemGap = this.container.id === "linkedinCarousel" ? 30 : 20;
      slideDistance = containerWidth + singleItemGap;
    } else {
      // Desktop/tablet: calculate with gaps
      const gap = 30;
      const totalGapWidth = (this.itemsPerView - 1) * gap;
      const singleCardWidth =
        (containerWidth - totalGapWidth) / this.itemsPerView;
      slideDistance = singleCardWidth + gap;
    }

    // Move by exactly one card width for smooth single-post navigation
    const translateX = -(this.currentIndex * slideDistance);
    this.track.style.transform = `translateX(${translateX}px)`;
    this.track.style.transition =
      "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Smooth easing

    // Update button visibility
    this.updateVisibility();
  }

  updateBadges() {
    this.badges.forEach((badge, index) => {
      badge.classList.toggle("active", index === this.currentIndex);
    });
  }

  updateVisibility() {
    // Always show navigation if there are more items than can fit on screen
    const needsNavigation = this.totalItems > this.itemsPerView;

    if (this.prevBtn) {
      this.prevBtn.classList.toggle(
        "visible",
        needsNavigation && this.currentIndex > 0
      );
    }

    if (this.nextBtn) {
      // For single-post navigation, check if we can move to the next post
      const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
      this.nextBtn.classList.toggle(
        "visible",
        needsNavigation && this.currentIndex < maxIndex
      );
    }
  }

  goToSlide(index) {
    // Constrain to valid range for single-post navigation
    const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    this.updateCarousel();
    this.updateBadges();
  }

  navigate(direction) {
    if (direction > 0) {
      // Next: move by exactly 1 post regardless of screen size
      const maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
      this.currentIndex = Math.min(this.currentIndex + 1, maxIndex);
    } else {
      // Previous: move by exactly 1 post regardless of screen size
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }
    this.updateCarousel();
    this.updateBadges();
  }
}

// Navigation function for buttons
function navigateCarousel(carouselId, direction) {
  if (window.carousels && window.carousels[carouselId]) {
    window.carousels[carouselId].navigate(direction);
  }
}

// Initialize carousels on page load
document.addEventListener("DOMContentLoaded", () => {
  window.carousels = {};

  // Initialize Learning carousel
  if (document.getElementById("learningCarousel")) {
    window.carousels["learningCarousel"] = new SmartCarousel(
      "learningCarousel"
    );
  }

  // Initialize LinkedIn carousel
  if (document.getElementById("linkedinCarousel")) {
    window.carousels["linkedinCarousel"] = new SmartCarousel(
      "linkedinCarousel"
    );
  }

  // Initialize Projects carousel
  if (document.getElementById("projectsCarousel")) {
    window.carousels["projectsCarousel"] = new SmartCarousel(
      "projectsCarousel"
    );
  }

  // Initialize Medium carousel
  if (document.getElementById("mediumCarousel")) {
    window.carousels["mediumCarousel"] = new SmartCarousel(
      "mediumCarousel"
    );
  }
});
